//#region node_modules/.nitro/vite/services/ssr/assets/format-yU-BRXA1.js
var money = (n) => new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD"
}).format(Number(n));
var dateFmt = (d) => new Date(d).toLocaleDateString("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric"
});
//#endregion
export { money as n, dateFmt as t };
