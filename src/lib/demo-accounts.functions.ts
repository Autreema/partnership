import { createServerFn } from "@tanstack/react-start";

export const DEMO_ACCOUNTS = [
  { role: "admin", email: "admin@demo.partnership.app", password: "Admin@123", full_name: "Demo Admin" },
  { role: "reseller", email: "reseller@demo.partnership.app", password: "Reseller@123", full_name: "Demo Reseller" },
  { role: "user", email: "user@demo.partnership.app", password: "User@123", full_name: "Demo User" },
] as const;

export const ensureDemoAccounts = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  for (const acc of DEMO_ACCOUNTS) {
    // Look up existing user by email
    const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const existing = list?.users.find((u) => u.email?.toLowerCase() === acc.email);
    let userId = existing?.id;

    if (!existing) {
      const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
        email: acc.email,
        password: acc.password,
        email_confirm: true,
        user_metadata: { full_name: acc.full_name },
      });
      if (error) {
        console.error("demo create failed", acc.email, error.message);
        continue;
      }
      userId = created.user?.id;
    } else {
      // Ensure password matches expected demo value (idempotent reset)
      await supabaseAdmin.auth.admin.updateUserById(existing.id, {
        password: acc.password,
        email_confirm: true,
      });
    }

    if (!userId) continue;

    // Ensure profile
    await supabaseAdmin
      .from("profiles")
      .upsert({ id: userId, email: acc.email, full_name: acc.full_name }, { onConflict: "id" });

    // Ensure role (base 'user' role auto-added by trigger; add elevated one)
    if (acc.role !== "user") {
      await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: userId, role: acc.role as "admin" | "reseller" })
        .then((r) => {
          // ignore duplicate (unique constraint) errors
          if (r.error && !r.error.message.toLowerCase().includes("duplicate")) {
            console.error("role insert", r.error.message);
          }
        });
    }
  }

  return { ok: true };
});
