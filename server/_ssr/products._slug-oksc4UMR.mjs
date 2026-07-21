import { t as supabase } from "./client-DRzh4j6T.mjs";
import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-oksc4UMR.js
var productQuery = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: async () => {
		const { data } = await supabase.from("products").select("*, categories(name, slug)").eq("slug", slug).maybeSingle();
		return data;
	}
});
var $$splitNotFoundComponentImporter = () => import("./products._slug-BOzNoEKJ.mjs");
var $$splitComponentImporter = () => import("./products._slug-CweB4viR.mjs");
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
