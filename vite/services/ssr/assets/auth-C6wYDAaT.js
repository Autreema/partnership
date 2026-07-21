import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-YRqmbO_0.js";
import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { t as supabase } from "./client-DRzh4j6T.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as MarketingLayout } from "./MarketingLayout-DCrWCMX1.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ShieldCheck, Sparkles, Store, User } from "lucide-react";
import { z } from "zod";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
//#region src/components/ui/tabs.tsx
var Tabs = TabsPrimitive.Root;
var TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsPrimitive.Content.displayName;
//#endregion
//#region src/integrations/lovable/index.ts
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		redirect_uri: opts?.redirect_uri,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
//#endregion
//#region node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/demo-accounts.functions.ts
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
var ensureDemoAccounts = createServerFn({ method: "POST" }).handler(createSsrRpc("d3ec4dd35e3e325f74f1dae57691d0e168542742de5e2651ffc4c0742ff65814"));
//#endregion
//#region src/routes/auth.tsx?tsr-split=component
var emailSchema = z.string().trim().email().max(255);
var pwSchema = z.string().min(8).max(72);
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = useState("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [asReseller, setAsReseller] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		ensureDemoAccounts().catch(() => {});
	}, []);
	function fillDemo(role) {
		const acc = DEMO_ACCOUNTS.find((a) => a.role === role);
		if (!acc) return;
		setMode("login");
		setEmail(acc.email);
		setPassword(acc.password);
	}
	async function afterAuth(userId) {
		if (mode === "register" && asReseller) await supabase.from("user_roles").insert({
			user_id: userId,
			role: "reseller"
		});
		const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
		const list = (roles ?? []).map((r) => r.role);
		if (list.includes("admin")) navigate({ to: "/admin" });
		else if (list.includes("reseller")) navigate({ to: "/reseller" });
		else navigate({ to: "/dashboard" });
	}
	async function submit(e) {
		e.preventDefault();
		const eResult = emailSchema.safeParse(email);
		const pResult = pwSchema.safeParse(password);
		if (!eResult.success) return toast.error("Enter a valid email");
		if (!pResult.success) return toast.error("Password must be 8-72 characters");
		setLoading(true);
		if (mode === "login") {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			setLoading(false);
			if (error) return toast.error(error.message);
			toast.success("Welcome back");
			if (data.user) afterAuth(data.user.id);
		} else {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/`,
					data: { full_name: name }
				}
			});
			setLoading(false);
			if (error) return toast.error(error.message);
			toast.success("Account created");
			if (data.user) afterAuth(data.user.id);
		}
	}
	async function google() {
		if ((await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })).error) toast.error("Google sign-in failed");
	}
	async function forgot() {
		if (!emailSchema.safeParse(email).success) return toast.error("Enter your email first");
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
		if (error) toast.error(error.message);
		else toast.success("Password reset email sent");
	}
	return /* @__PURE__ */ jsx(MarketingLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-md px-4 py-16",
		children: [/* @__PURE__ */ jsxs(Card, {
			className: "p-8 shadow-glow",
			children: [/* @__PURE__ */ jsxs(Link, {
				to: "/",
				className: "flex items-center gap-2 font-display font-bold mb-6 justify-center",
				children: [/* @__PURE__ */ jsx("span", {
					className: "w-8 h-8 rounded-lg bg-brand-gradient grid place-items-center text-white",
					children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" })
				}), "PartnerShip"]
			}), /* @__PURE__ */ jsxs(Tabs, {
				value: mode,
				onValueChange: (v) => setMode(v),
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "grid grid-cols-2 w-full",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "login",
							children: "Sign in"
						}), /* @__PURE__ */ jsx(TabsTrigger, {
							value: "register",
							children: "Create account"
						})]
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-6 space-y-4",
						children: [
							mode === "register" && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "name",
								children: "Full name"
							}), /* @__PURE__ */ jsx(Input, {
								id: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								maxLength: 100
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ jsx(Input, {
								id: "email",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true,
								maxLength: 255
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ jsx(Input, {
								id: "password",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true,
								maxLength: 72,
								minLength: 8
							})] }),
							mode === "register" && /* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: asReseller,
									onChange: (e) => setAsReseller(e.target.checked)
								}), "Sign me up as a reseller"]
							}),
							/* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: loading,
								className: "w-full bg-brand-gradient text-white border-0",
								children: loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"
							}),
							mode === "login" && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: forgot,
								className: "text-xs text-muted-foreground hover:text-primary w-full text-center",
								children: "Forgot password?"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "OR"
							}),
							/* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						className: "w-full mt-6",
						onClick: google,
						children: [/* @__PURE__ */ jsx(GoogleIcon, {}), " Continue with Google"]
					}),
					/* @__PURE__ */ jsx(TabsContent, { value: "login" }),
					/* @__PURE__ */ jsx(TabsContent, { value: "register" })
				]
			})]
		}), /* @__PURE__ */ jsxs(Card, {
			className: "mt-6 p-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ jsx("h2", {
						className: "font-display font-semibold",
						children: "Demo Accounts"
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground mb-4",
					children: "Try PartnerShip instantly — click a role to fill the sign-in form, then press Sign in."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: DEMO_ACCOUNTS.map((acc) => {
						return /* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-border/60 p-3 flex items-start gap-3",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-9 h-9 rounded-md bg-muted grid place-items-center shrink-0",
									children: /* @__PURE__ */ jsx(acc.role === "admin" ? ShieldCheck : acc.role === "reseller" ? Store : User, { className: "w-4 h-4 text-primary" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex-1 min-w-0 text-xs",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "font-medium text-sm capitalize",
											children: acc.role
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-muted-foreground truncate",
											children: ["Email: ", acc.email]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-muted-foreground",
											children: ["Password: ", acc.password]
										})
									]
								}),
								/* @__PURE__ */ jsx(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: () => fillDemo(acc.role),
									children: "Use"
								})
							]
						}, acc.role);
					})
				})
			]
		})]
	}) });
}
function GoogleIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 48 48",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("path", {
				fill: "#FFC107",
				d: "M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
			}),
			/* @__PURE__ */ jsx("path", {
				fill: "#FF3D00",
				d: "M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
			}),
			/* @__PURE__ */ jsx("path", {
				fill: "#4CAF50",
				d: "M24 44c5.2 0 9.9-2 13.4-5.3l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.6 16.2 44 24 44z"
			}),
			/* @__PURE__ */ jsx("path", {
				fill: "#1976D2",
				d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2c-.4.4 6.6-4.8 6.6-14.8 0-1.3-.1-2.3-.4-3.5z"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
