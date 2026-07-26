"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { CutType } from "@/types/database";

export async function createReview(yerbaId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("review").insert({
    yerba_id: yerbaId,
    user_id: user.id,
    overall_score: Number(formData.get("overall_score")),
    aroma_note: (formData.get("aroma_note") as string) || null,
    bitterness_intensity: Number(formData.get("bitterness_intensity")),
    cut_type: formData.get("cut_type") as CutType,
    foam_quality: Number(formData.get("foam_quality")),
    yield_notes: (formData.get("yield_notes") as string) || null,
    verdict: (formData.get("verdict") as string) || null,
    photo_url: (formData.get("photo_url") as string) || null,
  });

  if (error) {
    redirect(
      `/catalog/${yerbaId}/review/new?error=${encodeURIComponent(error.message)}`,
    );
  }

  revalidatePath("/catalog");
  redirect("/catalog");
}
