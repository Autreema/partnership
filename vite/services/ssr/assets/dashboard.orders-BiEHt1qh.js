import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/_authenticated/dashboard.orders.tsx
var $$splitComponentImporter = () => import("./dashboard.orders-CMHrprDZ.js");
var Route = createFileRoute("/_authenticated/dashboard/orders")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
export { Route as t };
