import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { DollarSign, Link2, Rocket, UserPlus } from "lucide-react";
//#region src/routes/how-it-works.tsx?tsr-split=component
var STEPS = [
	{
		icon: UserPlus,
		t: "1. Create an account",
		d: "Sign up as a customer or reseller in under a minute."
	},
	{
		icon: Link2,
		t: "2. Grab your referral link",
		d: "Every reseller gets a unique code that tracks clicks, signups, and purchases."
	},
	{
		icon: DollarSign,
		t: "3. Earn commissions",
		d: "When someone buys through your link, you earn a % — automatically."
	},
	{
		icon: Rocket,
		t: "4. Withdraw anytime",
		d: "Request payouts to your preferred method whenever you hit the minimum."
	}
];
var SplitComponent = () => /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsxs("section", {
	className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16",
	children: [
		/* @__PURE__ */ jsx("h1", {
			className: "text-4xl md:text-5xl font-display font-bold text-center",
			children: "How it works"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground text-center mt-3 max-w-2xl mx-auto",
			children: "Four steps from signup to your first commission payout."
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-12 grid md:grid-cols-2 gap-8",
			children: STEPS.map((s) => /* @__PURE__ */ jsxs("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "shrink-0 w-12 h-12 rounded-xl bg-brand-gradient grid place-items-center text-white",
					children: /* @__PURE__ */ jsx(s.icon, { className: "w-6 h-6" })
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "font-display font-semibold text-lg",
					children: s.t
				}), /* @__PURE__ */ jsx("div", {
					className: "text-muted-foreground text-sm mt-1",
					children: s.d
				})] })]
			}, s.t))
		})
	]
}) });
//#endregion
export { SplitComponent as component };
