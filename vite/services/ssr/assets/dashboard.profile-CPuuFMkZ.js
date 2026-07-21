import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Route } from "./dashboard.profile-DHR4tUlU.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
//#region src/routes/_authenticated/dashboard.profile.tsx?tsr-split=component
function Profile() {
	const { user } = Route.useRouteContext();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["profile", user.id],
		queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()).data
	});
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	useEffect(() => {
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
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
		className: "text-2xl font-display font-bold mb-6",
		children: "Profile"
	}), /* @__PURE__ */ jsxs(Card, {
		className: "p-6 max-w-lg shadow-card space-y-4",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Email" }), /* @__PURE__ */ jsx(Input, {
				value: user.email ?? "",
				disabled: true
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
				htmlFor: "fn",
				children: "Full name"
			}), /* @__PURE__ */ jsx(Input, {
				id: "fn",
				value: name,
				onChange: (e) => setName(e.target.value)
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
				htmlFor: "ph",
				children: "Phone"
			}), /* @__PURE__ */ jsx(Input, {
				id: "ph",
				value: phone,
				onChange: (e) => setPhone(e.target.value)
			})] }),
			/* @__PURE__ */ jsx(Button, {
				onClick: save,
				className: "bg-brand-gradient text-white border-0",
				children: "Save changes"
			})
		]
	})] });
}
//#endregion
export { Profile as component };
