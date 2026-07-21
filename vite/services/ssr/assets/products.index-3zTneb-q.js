import { t as supabase } from "./client-DRzh4j6T.js";
import { queryOptions } from "@tanstack/react-query";
//#region src/routes/products.index.tsx?tsr-shared=1
var productsQuery = queryOptions({
	queryKey: ["products", "all"],
	queryFn: async () => {
		const { data } = await supabase.from("products").select("id, name, slug, short_description, price, image_url, commission_percent, categories(name, slug)").eq("status", "active").order("featured", { ascending: false });
		return data ?? [];
	}
});
var categoriesQuery = queryOptions({
	queryKey: ["categories"],
	queryFn: async () => (await supabase.from("categories").select("*").order("name")).data ?? []
});
//#endregion
export { productsQuery as n, categoriesQuery as t };
