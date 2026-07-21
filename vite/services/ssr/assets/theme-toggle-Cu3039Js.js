import { t as Button } from "./button-Bq5vK6RO.js";
import { useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
//#region src/hooks/use-theme.ts
function getInitial() {
	if (typeof window === "undefined") return "light";
	const saved = window.localStorage.getItem("theme");
	if (saved === "light" || saved === "dark") return saved;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function useTheme() {
	const [theme, setTheme] = useState("light");
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		const initial = getInitial();
		setTheme(initial);
		setMounted(true);
	}, []);
	useEffect(() => {
		if (!mounted) return;
		document.documentElement.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem("theme", theme);
	}, [theme, mounted]);
	return {
		theme,
		mounted,
		toggle: () => setTheme((t) => t === "dark" ? "light" : "dark"),
		setTheme
	};
}
//#endregion
//#region src/components/ui/theme-toggle.tsx
function ThemeToggle({ className }) {
	const { theme, toggle, mounted } = useTheme();
	return /* @__PURE__ */ jsx(Button, {
		variant: "ghost",
		size: "icon",
		onClick: toggle,
		"aria-label": "Toggle theme",
		className,
		children: mounted && theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" })
	});
}
//#endregion
export { ThemeToggle as t };
