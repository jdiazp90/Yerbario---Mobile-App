"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password: formData.get("password") as string,
    options: {
      data: { display_name: formData.get("display_name") as string },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // Email confirmation is on by default for new Supabase projects — no
  // session yet means the user still needs to click the link in their inbox.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  redirect(`/signup/check-email?email=${encodeURIComponent(email)}`);
}

export async function resendConfirmationEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resend({ type: "signup", email });

  const params = new URLSearchParams({ email });
  if (error) {
    params.set("error", error.message);
  } else {
    params.set("resent", "1");
  }
  redirect(`/signup/check-email?${params.toString()}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/forgot-password/check-email?email=${encodeURIComponent(email)}`);
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (password !== confirmPassword) {
    redirect(
      `/reset-password?error=${encodeURIComponent("Las contraseñas no coinciden.")}`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  // The recovery link already left the user with a valid session — sending
  // them straight in avoids a second login right after they just proved
  // account ownership via email.
  revalidatePath("/", "layout");
  redirect("/");
}
