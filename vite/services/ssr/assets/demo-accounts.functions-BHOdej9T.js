import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-CIHAFgYl.js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/demo-accounts.functions.ts?tss-serverfn-split
var DEMO_ACCOUNTS = [
	{
		role: "admin",
		email: "admin@demo.partnership.app",
		password: "Admin@123",
		full_name: "Demo Admin"
	},
	{
		role: "reseller",
		email: "reseller@demo.partnership.app",
		password: "Reseller@123",
		full_name: "Demo Reseller"
	},
	{
		role: "user",
		email: "user@demo.partnership.app",
		password: "User@123",
		full_name: "Demo User"
	}
];
var ensureDemoAccounts_createServerFn_handler = createServerRpc({
	id: "d3ec4dd35e3e325f74f1dae57691d0e168542742de5e2651ffc4c0742ff65814",
	name: "ensureDemoAccounts",
	filename: "src/lib/demo-accounts.functions.ts"
}, (opts) => ensureDemoAccounts.__executeServer(opts));
var ensureDemoAccounts = createServerFn({ method: "POST" }).handler(ensureDemoAccounts_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.js");
	for (const acc of DEMO_ACCOUNTS) {
		const { data: list } = await supabaseAdmin.auth.admin.listUsers({
			page: 1,
			perPage: 200
		});
		const existing = list?.users.find((u) => u.email?.toLowerCase() === acc.email);
		let userId = existing?.id;
		if (!existing) {
			const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
				email: acc.email,
				password: acc.password,
				email_confirm: true,
				user_metadata: { full_name: acc.full_name }
			});
			if (error) {
				console.error("demo create failed", acc.email, error.message);
				continue;
			}
			userId = created.user?.id;
		} else await supabaseAdmin.auth.admin.updateUserById(existing.id, {
			password: acc.password,
			email_confirm: true
		});
		if (!userId) continue;
		await supabaseAdmin.from("profiles").upsert({
			id: userId,
			email: acc.email,
			full_name: acc.full_name
		}, { onConflict: "id" });
		if (acc.role !== "user") await supabaseAdmin.from("user_roles").insert({
			user_id: userId,
			role: acc.role
		}).then((r) => {
			if (r.error && !r.error.message.toLowerCase().includes("duplicate")) console.error("role insert", r.error.message);
		});
	}
	return { ok: true };
});
//#endregion
export { ensureDemoAccounts_createServerFn_handler };
