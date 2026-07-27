import { createClient } from "@/lib/supabase/server";

/**
 * Resolves the final photo URL for a form submission: uploads a new file to
 * Supabase Storage if one was picked, otherwise falls back to whatever URL
 * the form's hidden field carried forward (the existing photo, on an edit;
 * empty on a fresh create).
 */
export async function resolvePhotoUrl(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  fileFieldName: string,
  currentUrlFieldName: string,
  userId: string,
): Promise<string | null> {
  const file = formData.get(fileFieldName);

  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("yerba-photos")
      .upload(path, file, { contentType: file.type || "image/jpeg" });

    if (error) throw new Error(error.message);

    const {
      data: { publicUrl },
    } = supabase.storage.from("yerba-photos").getPublicUrl(path);

    return publicUrl;
  }

  return (formData.get(currentUrlFieldName) as string) || null;
}
