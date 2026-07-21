import { t as cn } from "./utils-C_uf36nf.js";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
//#region src/components/ui/accordion.tsx
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
	className: "flex",
	children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
//#endregion
//#region src/routes/faq.tsx?tsr-split=component
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
var SplitComponent = () => /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsxs("section", {
	className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16",
	children: [/* @__PURE__ */ jsx("h1", {
		className: "text-4xl font-display font-bold",
		children: "Frequently asked"
	}), /* @__PURE__ */ jsx(Accordion, {
		type: "single",
		collapsible: true,
		className: "mt-8",
		children: FAQS.map((f, i) => /* @__PURE__ */ jsxs(AccordionItem, {
			value: `i-${i}`,
			children: [/* @__PURE__ */ jsx(AccordionTrigger, {
				className: "text-left",
				children: f.q
			}), /* @__PURE__ */ jsx(AccordionContent, {
				className: "text-muted-foreground",
				children: f.a
			})]
		}, i))
	})]
}) });
//#endregion
export { SplitComponent as component };
