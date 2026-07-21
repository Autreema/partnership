import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { t as dateFmt } from "./format-yU-BRXA1.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Route } from "./dashboard.subscriptions-Kn6OraOJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.subscriptions-Cs6ML7MX.js
var import_jsx_runtime = require_jsx_runtime();
function Subs() {
	const { user } = Route.useRouteContext();
	const { data } = useQuery({
		queryKey: [
			"subs",
			user.id,
			"list"
		],
		queryFn: async () => (await supabase.from("subscriptions").select("*, products(name)").eq("user_id", user.id).order("created_at", { ascending: false })).data ?? []
	});
	const now = Date.now();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Subscriptions"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid md:grid-cols-2 gap-4",
		children: [(data ?? []).map((s) => {
			const expired = new Date(s.expires_at).getTime() < now;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display font-semibold",
							children: s.products?.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: expired ? "destructive" : "default",
							children: expired ? "Expired" : "Active"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground mt-2",
						children: ["Started ", dateFmt(s.started_at)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground",
						children: ["Renews ", dateFmt(s.expires_at)]
					})
				]
			}, s.id);
		}), (data ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-8 text-center text-muted-foreground shadow-card md:col-span-2",
			children: "No subscriptions yet."
		})]
	})] });
}
//#endregion
export { Subs as component };
