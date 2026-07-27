import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Exchanges the PKCE `code` Supabase puts on password-recovery (and other)
// email links for a real session, then hands off to `next`. Generic on
// purpose — any flow that emails a Supabase auth link can redirect here.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/forgot-password?error=${encodeURIComponent(
      "El link expiró o ya se usó. Pedí uno nuevo.",
    )}`,
  );
}
