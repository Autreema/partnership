import { createFileRoute, redirect } from "@tanstack/react-router";

// Admin placeholder — phase 3
export const Route = createFileRoute("/_authenticated/admin/")({
  loader: () => { throw redirect({ to: "/dashboard" }); },
  component: () => null,
});
