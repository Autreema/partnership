import { createFileRoute, redirect } from "@tanstack/react-router";

// Reseller placeholder — phase 2
export const Route = createFileRoute("/_authenticated/reseller/")({
  loader: () => { throw redirect({ to: "/dashboard" }); },
  component: () => null,
});
