import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./dashboard.profile-DHR4tUlU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.profile-CPuuFMkZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const { user } = Route.useRouteContext();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["profile", user.id],
		queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()).data
	});
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (data) {
			setName(data.full_name ?? "");
			setPhone(data.phone ?? "");
		}
	}, [data]);
	async function save() {
		const { error } = await supabase.from("profiles").update({
			full_name: name,
			phone
		}).eq("id", user.id);
		if (error) toast.error(error.message);
		else {
			toast.success("Saved");
			qc.invalidateQueries({ queryKey: ["profile"] });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Profile"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-6 max-w-lg shadow-card space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: user.email ?? "",
				disabled: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "fn",
				children: "Full name"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "fn",
				value: name,
				onChange: (e) => setName(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "ph",
				children: "Phone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "ph",
				value: phone,
				onChange: (e) => setPhone(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				className: "bg-brand-gradient text-white border-0",
				children: "Save changes"
			})
		]
	})] });
}
//#endregion
export { Profile as component };
