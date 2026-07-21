import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);
  return { session, user: session?.user ?? null, loading };
}

export function useUserRole() {
  const { user, loading } = useSession();
  const [role, setRole] = useState<"admin" | "reseller" | "user" | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      setRole(null);
      setReady(true);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const roles = (data ?? []).map((r) => r.role);
        setRole(roles.includes("admin") ? "admin" : roles.includes("reseller") ? "reseller" : "user");
        setReady(true);
      });
  }, [user, loading]);
  return { role, user, ready };
}
