import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as supabase } from "./client-DRzh4j6T.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { D as MapPin, O as Mail, x as Phone } from "../_libs/lucide-react.mjs";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BNE28sso.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var schema = objectType({
	name: stringType().trim().min(1).max(100),
	email: stringType().trim().email().max(255),
	subject: stringType().trim().max(200).optional(),
	message: stringType().trim().min(1).max(2e3)
});
function ContactPage() {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [sending, setSending] = (0, import_react.useState)(false);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-display font-bold",
				children: "Get in touch"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-3",
				children: "Questions about becoming a reseller, listing a product, or bulk pricing? We'd love to hear from you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-4 h-4 text-primary" }), "hello@partnership.app"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4 text-primary" }), "+1 (555) 010-0100"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-primary" }), "Remote-first, globally distributed"]
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-6 shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "n",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "n",
						value: form.name,
						onChange: (e) => setForm({
							...form,
							name: e.target.value
						}),
						required: true,
						maxLength: 100
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "e",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "s",
						children: "Subject"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "s",
						value: form.subject,
						onChange: (e) => setForm({
							...form,
							subject: e.target.value
						}),
						maxLength: 200
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "m",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
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
