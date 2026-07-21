import { t as supabase } from "./client-DRzh4j6T.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import * as React from "react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/routes/contact.tsx?tsr-split=component
var schema = z.object({
	name: z.string().trim().min(1).max(100),
	email: z.string().trim().email().max(255),
	subject: z.string().trim().max(200).optional(),
	message: z.string().trim().min(1).max(2e3)
});
function ContactPage() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [sending, setSending] = useState(false);
	async function submit(e) {
		e.preventDefault();
		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
			return;
		}
		setSending(true);
		const { error } = await supabase.from("contact_messages").insert(parsed.data);
		setSending(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Thanks! We'll be in touch.");
			setForm({
				name: "",
				email: "",
				subject: "",
				message: ""
			});
		}
	}
	return /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10",
		children: [/* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-4xl font-display font-bold",
				children: "Get in touch"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-3",
				children: "Questions about becoming a reseller, listing a product, or bulk pricing? We'd love to hear from you."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-8 space-y-4 text-sm",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-primary" }), "hello@partnership.app"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-primary" }), "+1 (555) 010-0100"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-primary" }), "Remote-first, globally distributed"]
					})
				]
			})
		] }), /* @__PURE__ */ jsx(Card, {
			className: "p-6 shadow-card",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "n",
						children: "Name"
					}), /* @__PURE__ */ jsx(Input, {
						id: "n",
						value: form.name,
						onChange: (e) => setForm({
							...form,
							name: e.target.value
						}),
						required: true,
						maxLength: 100
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "e",
						children: "Email"
					}), /* @__PURE__ */ jsx(Input, {
						id: "e",
						type: "email",
						value: form.email,
						onChange: (e) => setForm({
							...form,
							email: e.target.value
						}),
						required: true,
						maxLength: 255
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "s",
						children: "Subject"
					}), /* @__PURE__ */ jsx(Input, {
						id: "s",
						value: form.subject,
						onChange: (e) => setForm({
							...form,
							subject: e.target.value
						}),
						maxLength: 200
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "m",
						children: "Message"
					}), /* @__PURE__ */ jsx(Textarea, {
						id: "m",
						value: form.message,
						onChange: (e) => setForm({
							...form,
							message: e.target.value
						}),
						required: true,
						rows: 5,
						maxLength: 2e3
					})] }),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: sending,
						className: "w-full bg-brand-gradient text-white border-0",
						children: sending ? "Sending…" : "Send message"
					})
				]
			})
		})]
	}) });
}
//#endregion
export { ContactPage as component };
