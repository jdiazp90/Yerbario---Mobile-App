"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { resolvePhotoUrl } from "@/lib/storage";
import type { CutType } from "@/types/database";

export async function createReview(yerbaId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let photoUrl: string | null;
  let moliendaPhotoUrl: string | null;
  try {
    [photoUrl, moliendaPhotoUrl] = await Promise.all([
      resolvePhotoUrl(supabase, formData, "photo_file", "photo_url", user.id),
      resolvePhotoUrl(
        supabase,
        formData,
        "molienda_photo_file",
        "molienda_photo_url",
        user.id,
      ),
    ]);
  } catch (uploadError) {
    redirect(
      `/catalog/${yerbaId}/review/new?error=${encodeURIComponent((uploadError as Error).message)}`,
    );
  }

  const { error } = await supabase.from("review").insert({
    yerba_id: yerbaId,
    user_id: user.id,
    overall_score: Number(formData.get("overall_score")),
    aroma_note: (formData.get("aroma_note") as string) || null,
    aroma_tags: formData.getAll("aroma_tags") as string[],
    bitterness_intensity: Number(formData.get("bitterness_intensity")),
    cut_type: formData.get("cut_type") as CutType,
    foam_quality: Number(formData.get("foam_quality")),
    yield_notes: (formData.get("yield_notes") as string) || null,
    verdict: (formData.get("verdict") as string) || null,
    photo_url: photoUrl,
    molienda_photo_url: moliendaPhotoUrl,
  });

  if (error) {
    redirect(
      `/catalog/${yerbaId}/review/new?error=${encodeURIComponent(error.message)}`,
    );
  }

  revalidatePath("/catalog");
  redirect("/catalog");
}
