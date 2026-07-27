"use client";

import { useEffect, useState, type ReactNode } from "react";
import { chromeClass } from "@/lib/ui";
import { CloseIcon, ZoomIcon } from "./icons";

/**
 * Wraps an image (passed as `children`, already rendered — e.g. YerbaImage)
 * with a tap-to-expand full-screen viewer. No-ops (renders children as-is,
 * no affordance) when there's no real photo — expanding a placeholder tile
 * isn't useful.
 */
export function ImageLightbox({
  src,
  alt,
  children,
}: {
  src?: string | null;
  alt: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const hasImage = Boolean(src?.trim());

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!hasImage) return <>{children}</>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver ${alt} en grande`}
        className="group relative block w-full text-left"
      >
        {children}
        <span
          className={`absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full text-ink shadow-sm transition-transform group-hover:scale-105 ${chromeClass}`}
        >
          <ZoomIcon />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src ?? undefined}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
