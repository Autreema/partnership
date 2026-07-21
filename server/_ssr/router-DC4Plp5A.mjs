import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Route$14 } from "./dashboard.cart-CZ0bqA8J.mjs";
import { t as Route$15 } from "./dashboard.checkout-HzJ8ie2b.mjs";
import { t as Route$16 } from "./dashboard.index-DD-Rlufa.mjs";
import { t as Route$17 } from "./dashboard.notifications-O8fHvxLu.mjs";
import { t as Route$18 } from "./dashboard.orders-BiEHt1qh.mjs";
import { t as Route$19 } from "./dashboard.profile-DHR4tUlU.mjs";
import { t as Route$20 } from "./dashboard.subscriptions-Kn6OraOJ.mjs";
import { t as Route$21 } from "./products._slug-oksc4UMR.mjs";
import { n as productsQuery, t as categoriesQuery } from "./products.index-3zTneb-q.mjs";
import { t as Route$22 } from "./route-DSA2P_Y1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DC4Plp5A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-TUNG57pp.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-brand-gradient",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90",
						children: "Back home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PartnerShip — Software Marketplace & Reseller Platform" },
			{
				name: "description",
				content: "Buy, sell, and resell software subscriptions with built-in referral tracking and commission payouts."
			},
			{
				property: "og:title",
				content: "PartnerShip — Software Marketplace"
			},
			{
				property: "og:description",
				content: "A modern SaaS marketplace with a full reseller & commission system built in."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})]
	});
}
var $$splitComponentImporter$11 = () => import("./routes-BaZq7dxH.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./about-e6OfqCGP.mjs");
var Route$11 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — PartnerShip" }, {
		name: "description",
		content: "PartnerShip is a modern software marketplace built for both makers and resellers."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./auth-C6wYDAaT.mjs");
var Route$10 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — PartnerShip" }, {
		name: "description",
		content: "Sign in or create your PartnerShip account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./contact-BNE28sso.mjs");
var Route$9 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — PartnerShip" }, {
		name: "description",
		content: "Get in touch with the PartnerShip team."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./faq-BnIs0dTZ.mjs");
var Route$8 = createFileRoute("/faq")({
	head: () => ({ meta: [{ title: "FAQ — PartnerShip" }, {
		name: "description",
		content: "Answers to common questions about PartnerShip, resellers, and commissions."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./how-it-works-DFJ3Z4IL.mjs");
var Route$7 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [{ title: "How it works — PartnerShip" }, {
		name: "description",
		content: "See how the PartnerShip marketplace, referrals, and commissions work end-to-end."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./pricing-lw6OkHik.mjs");
var Route$6 = createFileRoute("/pricing")({
	head: () => ({ meta: [{ title: "Pricing — PartnerShip" }, {
		name: "description",
		content: "Simple subscription pricing with reseller commissions on every plan."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./reset-password-4u-gN_Cv.mjs");
var Route$5 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Reset password — PartnerShip" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var BASE_URL = "";
var Route$4 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		"/",
		"/about",
		"/products",
		"/pricing",
		"/how-it-works",
		"/faq",
		"/contact",
		"/auth"
	].map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$3 = () => import("./products.index-CaBK2uEQ.mjs");
var Route$3 = createFileRoute("/products/")({
	head: () => ({ meta: [{ title: "Products — PartnerShip Software Marketplace" }, {
		name: "description",
		content: "Browse and buy software subscriptions from the PartnerShip marketplace."
	}] }),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQuery);
		context.queryClient.ensureQueryData(categoriesQuery);
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.index-DCAF14x0.mjs");
var Route$2 = createFileRoute("/_authenticated/admin/")({
	loader: () => {
		throw redirect({ to: "/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./dashboard.browse-DXf7c4OW.mjs");
var Route$1 = createFileRoute("/_authenticated/dashboard/browse")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./reseller.index-D9_4xJdY.mjs");
var Route = createFileRoute("/_authenticated/reseller/")({
	loader: () => {
		throw redirect({ to: "/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AuthenticatedRouteRoute = Route$22.update({
	id: "/_authenticated",
	getParentRoute: () => Route$13
});
var AboutRoute = Route$11.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$13
});
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$13
});
var ContactRoute = Route$9.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$13
});
var FaqRoute = Route$8.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$13
});
var HowItWorksRoute = Route$7.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$13
});
var PricingRoute = Route$6.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$13
});
var ResetPasswordRoute = Route$5.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$13
});
var SitemapDotxmlRoute = Route$4.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$13
});
var ProductsIndexRoute = Route$3.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => Route$13
});
var ProductsSlugRoute = Route$21.update({
	id: "/products/$slug",
	path: "/products/$slug",
	getParentRoute: () => Route$13
});
var AuthenticatedAdminIndexRoute = Route$2.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardIndexRoute = Route$16.update({
	id: "/dashboard/",
	path: "/dashboard/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedDashboardBrowseRoute: Route$1.update({
		id: "/dashboard/browse",
		path: "/dashboard/browse",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardCartRoute: Route$14.update({
		id: "/dashboard/cart",
		path: "/dashboard/cart",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardCheckoutRoute: Route$15.update({
		id: "/dashboard/checkout",
		path: "/dashboard/checkout",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardNotificationsRoute: Route$17.update({
		id: "/dashboard/notifications",
		path: "/dashboard/notifications",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardOrdersRoute: Route$18.update({
		id: "/dashboard/orders",
		path: "/dashboard/orders",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardProfileRoute: Route$19.update({
		id: "/dashboard/profile",
		path: "/dashboard/profile",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardSubscriptionsRoute: Route$20.update({
		id: "/dashboard/subscriptions",
		path: "/dashboard/subscriptions",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedAdminIndexRoute,
	AuthenticatedDashboardIndexRoute,
	AuthenticatedResellerIndexRoute: Route.update({
		id: "/reseller/",
		path: "/reseller/",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	AuthRoute,
	ContactRoute,
	FaqRoute,
	HowItWorksRoute,
	PricingRoute,
	ResetPasswordRoute,
	SitemapDotxmlRoute,
	ProductsSlugRoute,
	ProductsIndexRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
