import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Route } from "./dashboard.subscriptions-Kn6OraOJ.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as dateFmt } from "./format-yU-BRXA1.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
//#region src/routes/_authenticated/dashboard.subscriptions.tsx?tsr-split=component
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
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Subscriptions"
	}), /* @__PURE__ */ jsxs("div", {
		className: "grid md:grid-cols-2 gap-4",
		children: [(data ?? []).map((s) => {
			const expired = new Date(s.expires_at).getTime() < now;
			return /* @__PURE__ */ jsxs(Card, {
				className: "p-5 shadow-card",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-display font-semibold",
							children: s.products?.name
						}), /* @__PURE__ */ jsx(Badge, {
							variant: expired ? "destructive" : "default",
							children: expired ? "Expired" : "Active"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "text-sm text-muted-foreground mt-2",
						children: ["Started ", dateFmt(s.started_at)]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "text-sm text-muted-foreground",
						children: ["Renews ", dateFmt(s.expires_at)]
					})
				]
			}, s.id);
		}), (data ?? []).length === 0 && /* @__PURE__ */ jsx(Card, {
			className: "p-8 text-center text-muted-foreground shadow-card md:col-span-2",
			children: "No subscriptions yet."
		})]
	})] });
}
//#endregion
export { Subs as component };
