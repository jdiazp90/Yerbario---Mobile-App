"use client";

import { useId, useState } from "react";
import { fieldClass, fieldLabelClass } from "@/lib/ui";
import { CameraIcon } from "./icons";
import { YerbaImage } from "./yerba-image";

/**
 * Real photo upload — replaces the old paste-a-URL field. A tappable
 * thumbnail (existing photo, live preview of the newly picked file, or the
 * branded placeholder) opens the device's camera/gallery picker. The actual
 * upload happens server-side in the form's action via resolvePhotoUrl();
 * this component only handles the file input + local preview.
 *
 * `currentUrlFieldName` carries the existing photo's URL as a hidden field
 * so edit forms keep it when the user doesn't pick a new file.
 */
export function PhotoUploadField({
  fileFieldName,
  currentUrlFieldName,
  label,
  brand,
  defaultValue,
  size = "md",
}: {
  fileFieldName: string;
  currentUrlFieldName: string;
  label: string;
  brand: string;
  defaultValue?: string | null;
  size?: "md" | "lg";
}) {
  const id = useId();
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null);
  const dimensions = size === "lg" ? "h-36 w-36" : "h-24 w-24";

  return (
    <div className={fieldClass}>
      <span className={fieldLabelClass}>
        {label} <span className="font-medium text-ink-muted">· opcional</span>
      </span>

      <input
        type="hidden"
        name={currentUrlFieldName}
        value={defaultValue ?? ""}
      />

      <label
        htmlFor={id}
        className={`group relative block ${dimensions} cursor-pointer overflow-hidden rounded-md border border-line transition-colors hover:border-line-strong`}
      >
        <YerbaImage
          src={preview}
          alt={label}
          brand={brand}
          className="h-full w-full"
        />
        <span className="absolute bottom-1.5 right-1.5 grid h-8 w-8 place-items-center rounded-full bg-[var(--espresso-900)] text-ink-inverse shadow-[0_1px_0_rgba(255,255,255,.2)_inset,var(--shadow-sm)] transition-transform group-hover:scale-105">
          <CameraIcon />
        </span>
      </label>
      <input
        id={id}
        type="file"
        name={fileFieldName}
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
      />
    </div>
  );
}
