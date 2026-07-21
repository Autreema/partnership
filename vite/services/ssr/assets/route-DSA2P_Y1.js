import { t as supabase } from "./client-DRzh4j6T.js";
import { createFileRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
//#region src/routes/_authenticated/route.tsx
var $$splitComponentImporter = () => import("./route-Cac46YMW.js");
var Route = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
		const list = (roles ?? []).map((r) => r.role);
		const role = list.includes("admin") ? "admin" : list.includes("reseller") ? "reseller" : "user";
		return {
			user: data.user,
			role
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
