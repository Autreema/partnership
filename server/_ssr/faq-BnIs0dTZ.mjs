import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { L as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-BnIs0dTZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var FAQS = [
	{
		q: "How much do resellers earn?",
		a: "Each product sets its own commission rate — typically between 10% and 25% of every purchase made through your referral link."
	},
	{
		q: "How often are commissions paid?",
		a: "You can request a payout any time your approved commissions exceed the minimum threshold in your dashboard."
	},
	{
		q: "What payment methods do you support?",
		a: "Simulated cards, UPI, wallets, and net banking are supported at checkout in this demo."
	},
	{
		q: "Can I cancel a subscription anytime?",
		a: "Yes — subscriptions can be cancelled from your dashboard and remain active until the end of the paid period."
	},
	{
		q: "Is my data secure?",
		a: "Yes. We use row-level security, role-based access, and encrypted sessions."
	}
];
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
	className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-4xl font-display font-bold",
		children: "Frequently asked"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
		type: "single",
		collapsible: true,
		className: "mt-8",
		children: FAQS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
			value: `i-${i}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
				className: "text-left",
				children: f.q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
				className: "text-muted-foreground",
				children: f.a
			})]
		}, i))
	})]
}) });
//#endregion
export { SplitComponent as component };
