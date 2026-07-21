import { t as supabase } from "./client-DRzh4j6T.mjs";
import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DSA2P_Y1.js
var $$splitComponentImporter = () => import("./route-Cac46YMW.mjs");
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
