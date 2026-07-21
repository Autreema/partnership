//#region \0%23tanstack-start-server-fn-resolver
var manifest = { "d3ec4dd35e3e325f74f1dae57691d0e168542742de5e2651ffc4c0742ff65814": {
	functionName: "ensureDemoAccounts_createServerFn_handler",
	importer: () => import("./demo-accounts.functions-BHOdej9T.js")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
