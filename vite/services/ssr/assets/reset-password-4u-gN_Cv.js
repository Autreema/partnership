import { t as supabase } from "./client-DRzh4j6T.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
//#region src/routes/reset-password.tsx?tsr-split=component
function ResetPassword() {
	const navigate = useNavigate();
	const [pw, setPw] = useState("");
	const [loading, setLoading] = useState(false);
	async function submit(e) {
		e.preventDefault();
		if (pw.length < 8) return toast.error("Password must be at least 8 characters");
		setLoading(true);
		const { error } = await supabase.auth.updateUser({ password: pw });
		setLoading(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Password updated");
			navigate({ to: "/dashboard" });
		}
	}
	return /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsx("section", {
		className: "mx-auto max-w-md px-4 py-16",
		children: /* @__PURE__ */ jsxs(Card, {
			className: "p-8 shadow-card",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-display font-bold",
				children: "Set a new password"
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "mt-6 space-y-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
					htmlFor: "pw",
					children: "New password"
				}), /* @__PURE__ */ jsx(Input, {
					id: "pw",
					type: "password",
					value: pw,
					onChange: (e) => setPw(e.target.value),
					minLength: 8,
					maxLength: 72,
					required: true
				})] }), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: loading,
					className: "w-full bg-brand-gradient text-white border-0",
					children: loading ? "Saving…" : "Update password"
				})]
			})]
		})
	}) });
}
//#endregion
export { ResetPassword as component };
