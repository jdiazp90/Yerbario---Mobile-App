"use client";

import { useState } from "react";
import { LeafGlyph } from "./icons";

/**
 * Renders a yerba photo from a user-supplied URL, degrading to a branded
 * monogram tile when there's no URL OR the image fails to load — never a
 * broken-image icon. Uses a plain <img> on purpose: URLs are arbitrary
 * user input, so the next/image optimizer (which needs whitelisted hosts)
 * isn't a fit here.
 */
export function YerbaImage({
  src,
  alt,
  brand,
  className = "h-[72px] w-[72px]",
  rounded = "rounded-md",
}: {
  src?: string | null;
  alt: string;
  brand: string;
  className?: string;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);
  const url = src?.trim();
  const showImage = Boolean(url) && !failed;
  const initial = (brand.trim()[0] ?? "?").toUpperCase();

  return (
    <div
      className={`relative flex-none overflow-hidden ${rounded} ${className} ${
        showImage ? "bg-[var(--green-100)]" : "border border-[var(--green-300)]"
      }`}
      style={
        showImage
          ? undefined
          : {
              background:
                "radial-gradient(120% 120% at 30% 20%, var(--green-200), var(--green-100) 70%)",
            }
      }
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <span className="grid h-full w-full place-items-center text-2xl font-extrabold text-brand">
            {initial}
          </span>
          <LeafGlyph className="absolute bottom-1 right-1 h-[18px] w-[18px] text-brand/50" />
        </>
      )}
    </div>
  );
}
