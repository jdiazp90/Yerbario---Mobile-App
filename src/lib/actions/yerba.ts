"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { resolvePhotoUrl } from "@/lib/storage";
import type { OriginCountry, StickPresence, YerbaType } from "@/types/database";

function readYerbaForm(formData: FormData) {
  return {
    brand: formData.get("brand") as string,
    variety_name: formData.get("variety_name") as string,
    type: formData.get("type") as YerbaType,
    stick_presence: formData.get("stick_presence") as StickPresence,
    origin_country: formData.get("origin_country") as OriginCountry,
  };
}

export async function createYerba(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let imageUrl: string | null;
  try {
    imageUrl = await resolvePhotoUrl(
      supabase,
      formData,
      "image_file",
      "current_image_url",
      user.id,
    );
  } catch (uploadError) {
    redirect(
      `/catalog/new?error=${encodeURIComponent((uploadError as Error).message)}`,
    );
  }

  const { error } = await supabase
    .from("yerba")
    .insert({ ...readYerbaForm(formData), image_url: imageUrl });

  if (error) {
    redirect(`/catalog/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/catalog");
  redirect("/catalog");
}

export async function updateYerba(id: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let imageUrl: string | null;
  try {
    imageUrl = await resolvePhotoUrl(
      supabase,
      formData,
      "image_file",
      "current_image_url",
      user.id,
    );
  } catch (uploadError) {
    redirect(
      `/catalog/${id}/edit?error=${encodeURIComponent((uploadError as Error).message)}`,
    );
  }

  const { error } = await supabase
    .from("yerba")
    .update({ ...readYerbaForm(formData), image_url: imageUrl })
    .eq("id", id);

  if (error) {
    redirect(`/catalog/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/catalog");
  redirect("/catalog");
}
