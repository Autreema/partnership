import { t as supabase } from "./client-DRzh4j6T.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
//#region src/routes/products.$slug.tsx?tsr-shared=1
var productQuery = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: async () => {
		const { data } = await supabase.from("products").select("*, categories(name, slug)").eq("slug", slug).maybeSingle();
		return data;
	}
});
//#endregion
//#region src/routes/products.$slug.tsx
var $$splitNotFoundComponentImporter = () => import("./products._slug-BOzNoEKJ.js");
var $$splitComponentImporter = () => import("./products._slug-CweB4viR.js");
var Route = createFileRoute("/products/$slug")({
	loader: async ({ context, params }) => {
		if (!await context.queryClient.ensureQueryData(productQuery(params.slug))) throw notFound();
	},
	head: ({ params }) => ({ meta: [{ title: `${params.slug.replace(/-/g, " ")} — PartnerShip` }, {
		name: "description",
		content: `Buy ${params.slug.replace(/-/g, " ")} on PartnerShip.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { productQuery as n, Route as t };
