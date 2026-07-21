
-- =========================================================
-- ROLES
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'reseller', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) $$;

CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- =========================================================
-- PROFILES
-- =========================================================
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "admin manage profiles" ON public.profiles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Auto-create profile + default 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- CATALOG
-- =========================================================
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories readable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "admin manage categories" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text,
  commission_percent numeric(5,2) NOT NULL DEFAULT 10,
  status text NOT NULL DEFAULT 'active',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.products(category_id);
CREATE INDEX ON public.products(status);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "active products readable" ON public.products FOR SELECT USING (status = 'active' OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manage products" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  interval text NOT NULL,           -- monthly | quarterly | half_yearly | yearly
  duration_days integer NOT NULL,
  price_multiplier numeric(4,2) NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subscription_plans TO anon, authenticated;
GRANT ALL ON public.subscription_plans TO service_role;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "plans readable" ON public.subscription_plans FOR SELECT USING (true);
CREATE POLICY "admin manage plans" ON public.subscription_plans FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- CART
-- =========================================================
CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES public.subscription_plans(id) ON DELETE SET NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id, plan_id)
);
CREATE INDEX ON public.cart_items(user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cart_items TO authenticated;
GRANT ALL ON public.cart_items TO service_role;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own cart" ON public.cart_items FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- =========================================================
-- ORDERS
-- =========================================================
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE DEFAULT ('PS-' || upper(substr(gen_random_uuid()::text,1,8))),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referrer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  tax numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',       -- pending | paid | failed | cancelled | refunded
  payment_method text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.orders(user_id);
CREATE INDEX ON public.orders(referrer_id);
CREATE INDEX ON public.orders(status);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own orders read" ON public.orders FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR referrer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own orders insert" ON public.orders FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "own orders update" ON public.orders FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  plan_id uuid REFERENCES public.subscription_plans(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  line_total numeric(10,2) NOT NULL,
  commission_percent numeric(5,2) NOT NULL DEFAULT 0
);
CREATE INDEX ON public.order_items(order_id);
GRANT SELECT, INSERT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order items read" ON public.order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id
    AND (o.user_id = auth.uid() OR o.referrer_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "order items insert" ON public.order_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

-- =========================================================
-- PAYMENTS
-- =========================================================
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  method text NOT NULL,
  status text NOT NULL DEFAULT 'success',
  transaction_ref text NOT NULL DEFAULT ('TXN-' || upper(substr(gen_random_uuid()::text,1,12))),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.payments(user_id);
CREATE INDEX ON public.payments(order_id);
GRANT SELECT, INSERT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own payments read" ON public.payments FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own payments insert" ON public.payments FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- =========================================================
-- SUBSCRIPTIONS
-- =========================================================
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id),
  plan_id uuid REFERENCES public.subscription_plans(id),
  status text NOT NULL DEFAULT 'active',
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  auto_renew boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.subscriptions(user_id);
CREATE INDEX ON public.subscriptions(status);
GRANT SELECT, INSERT, UPDATE ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own subs read" ON public.subscriptions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own subs insert" ON public.subscriptions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "own subs update" ON public.subscriptions FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.subscription_renewals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  renewed_at timestamptz NOT NULL DEFAULT now(),
  new_expires_at timestamptz NOT NULL
);
GRANT SELECT, INSERT ON public.subscription_renewals TO authenticated;
GRANT ALL ON public.subscription_renewals TO service_role;
ALTER TABLE public.subscription_renewals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own renewals read" ON public.subscription_renewals FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.subscriptions s WHERE s.id = subscription_id
    AND (s.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

-- =========================================================
-- REFERRALS (reseller)
-- =========================================================
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code text NOT NULL UNIQUE,
  clicks integer NOT NULL DEFAULT 0,
  signups integer NOT NULL DEFAULT 0,
  purchases integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.referrals(reseller_id);
GRANT SELECT, INSERT, UPDATE ON public.referrals TO authenticated;
GRANT SELECT ON public.referrals TO anon;
GRANT ALL ON public.referrals TO service_role;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "referrals lookup by code" ON public.referrals FOR SELECT USING (true);
CREATE POLICY "own referrals write" ON public.referrals FOR UPDATE TO authenticated
  USING (reseller_id = auth.uid()) WITH CHECK (reseller_id = auth.uid());
CREATE POLICY "own referrals insert" ON public.referrals FOR INSERT TO authenticated
  WITH CHECK (reseller_id = auth.uid());

-- =========================================================
-- COMMISSIONS
-- =========================================================
CREATE TABLE public.commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',   -- pending | approved | paid
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.commissions(reseller_id);
CREATE INDEX ON public.commissions(status);
GRANT SELECT ON public.commissions TO authenticated;
GRANT ALL ON public.commissions TO service_role;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own commissions read" ON public.commissions FOR SELECT TO authenticated
  USING (reseller_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER commissions_touch BEFORE UPDATE ON public.commissions
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- WITHDRAWAL REQUESTS
-- =========================================================
CREATE TABLE public.withdrawal_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL CHECK (amount > 0),
  method text NOT NULL,
  account_details text,
  status text NOT NULL DEFAULT 'pending',   -- pending | approved | rejected | paid
  admin_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.withdrawal_requests(reseller_id);
GRANT SELECT, INSERT ON public.withdrawal_requests TO authenticated;
GRANT ALL ON public.withdrawal_requests TO service_role;
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own withdrawals read" ON public.withdrawal_requests FOR SELECT TO authenticated
  USING (reseller_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own withdrawals insert" ON public.withdrawal_requests FOR INSERT TO authenticated
  WITH CHECK (reseller_id = auth.uid());
CREATE POLICY "admin update withdrawals" ON public.withdrawal_requests FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER wr_touch BEFORE UPDATE ON public.withdrawal_requests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================================
-- NOTIFICATIONS
-- =========================================================
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  type text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.notifications(user_id, read);
GRANT SELECT, INSERT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notifs" ON public.notifications FOR ALL TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- =========================================================
-- CONTACT MESSAGES
-- =========================================================
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone submit contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read contact" ON public.contact_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- ACTIVITY LOGS + SETTINGS
-- =========================================================
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  meta jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin read logs" ON public.activity_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "insert own log" ON public.activity_logs FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE TABLE public.settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  is_public boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings TO anon, authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public settings readable" ON public.settings FOR SELECT USING (is_public = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manage settings" ON public.settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- SEED DATA
-- =========================================================
INSERT INTO public.subscription_plans (name, interval, duration_days, price_multiplier) VALUES
  ('Monthly','monthly',30,1),
  ('Quarterly','quarterly',90,2.7),
  ('Half-Yearly','half_yearly',180,5),
  ('Yearly','yearly',365,9);

INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Productivity','productivity','Tools to help teams do more','Zap'),
  ('Design','design','Design and creative software','Palette'),
  ('Developer Tools','developer-tools','APIs, IDEs, and dev utilities','Code'),
  ('Marketing','marketing','Grow your audience','Megaphone'),
  ('Analytics','analytics','Data and reporting','BarChart3');

INSERT INTO public.products (category_id, name, slug, short_description, description, price, commission_percent, featured, image_url)
SELECT c.id, p.name, p.slug, p.short, p.descr, p.price, p.comm, p.feat, p.img FROM (VALUES
  ('productivity','TaskFlow Pro','taskflow-pro','Team task management','Powerful task and project management for growing teams.',29.00,15,true,'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800'),
  ('productivity','NoteBase','notebase','Collaborative notes','A shared knowledge base for your whole company.',19.00,12,false,'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800'),
  ('design','PixelForge','pixelforge','Vector design app','Create logos, icons, and UI with a modern vector engine.',49.00,20,true,'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800'),
  ('design','MotionKit','motionkit','Animation toolkit','Ready-made motion presets for After Effects and Lottie.',39.00,18,false,'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800'),
  ('developer-tools','APIForge','apiforge','API testing suite','Design, test, and monitor APIs from one workspace.',35.00,15,true,'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800'),
  ('developer-tools','DeployCloud','deploycloud','Serverless deploys','Zero-config deployments for modern web apps.',59.00,20,false,'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'),
  ('marketing','MailPulse','mailpulse','Email marketing','Drip campaigns and newsletters that convert.',25.00,25,true,'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800'),
  ('analytics','InsightIQ','insightiq','Product analytics','Understand user behavior with funnels and cohorts.',45.00,18,false,'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800')
) AS p(cat_slug,name,slug,short,descr,price,comm,feat,img)
JOIN public.categories c ON c.slug = p.cat_slug;

INSERT INTO public.settings (key, value, is_public) VALUES
  ('site', '{"name":"PartnerShip","tagline":"Software marketplace with resellers built in"}', true),
  ('contact', '{"email":"hello@partnership.app","phone":"+1 (555) 010-0100"}', true);
