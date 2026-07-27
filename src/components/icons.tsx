// Inline icon set for the Sprint 1.5 shell + controls. Brand-carrying icons
// (LogoMark, LeafGlyph, MateGourd, the bottom-nav tabs) are hand-drawn and
// stay that way. The generic/utility icons below are Material Symbols
// (Outlined, weight 400, Apache-2.0) — paths sourced once from
// @material-symbols/svg-400 and inlined here, so there's no runtime font
// request or bundle dependency, just the same self-contained pattern as the
// rest of this file.

type IconProps = { className?: string };

function MaterialIcon({
  className,
  path,
}: IconProps & { path: string }) {
  return (
    <svg
      className={className}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export function LogoMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--brand)" />
      <path d="M16 24c0-6 3-9 8-10-1 6-4 9-8 10Z" fill="var(--green-200)" />
      <path d="M16 24c0-5-2.6-7.6-7-8.6.8 5.2 3.4 7.8 7 8.6Z" fill="var(--green-100)" />
      <path d="M16 25V13" stroke="var(--green-100)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowLeft({ className = "h-5 w-5" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z"
    />
  );
}

export function ChevronDown({ className = "h-4 w-4" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z"
    />
  );
}

export function CameraIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="M479.5-267q72.5 0 121.5-49t49-121.5q0-72.5-49-121T479.5-607q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5ZM140-120q-24 0-42-18t-18-42v-513q0-23 18-41.5t42-18.5h147l73-87h240l73 87h147q23 0 41.5 18.5T880-693v513q0 24-18.5 42T820-120H140Zm0-60h680v-513H645l-73-87H388l-73 87H140v513Zm340-257Z"
    />
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
    />
  );
}

export function ZoomIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="M796-121 533-384q-30 26-69.96 40.5Q423.08-329 378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Zm-31-85v-82h-82v-60h82v-81h60v81h81v60h-81v82h-60Z"
    />
  );
}

export function PencilIcon({ className = "h-[18px] w-[18px]" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z"
    />
  );
}

export function GlobeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM437-141v-82q-35 0-59-26t-24-61v-44L149-559q-5 20-7 39.5t-2 39.5q0 130 84.5 227T437-141Zm294-108q44-48 66.5-107.5T820-480q0-106-58-192.5T607-799v18q0 35-24 61t-59 26h-87v87q0 17-13.5 28T393-568h-83v88h258q17 0 28 13t11 30v127h43q29 0 51 17t30 44Z"
    />
  );
}

export function StarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="m323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"
    />
  );
}

export function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <MaterialIcon
      className={className}
      path="M796-121 533-384q-30 26-70 40.5T378-329q-108 0-183-75t-75-181q0-106 75-181t182-75q106 0 180.5 75T632-585q0 43-14 83t-42 75l264 262-44 44ZM377-389q81 0 138-57.5T572-585q0-81-57-138.5T377-781q-82 0-139.5 57.5T180-585q0 81 57.5 138.5T377-389Z"
    />
  );
}

export function LeafGlyph({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 22c0-8 4-12 10-13-1 8-5 12-10 13Z" />
    </svg>
  );
}

export function HomeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5h12V10" />
    </svg>
  );
}

export function CatalogIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9h17M9 20V9" />
    </svg>
  );
}

export function RankingIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 20V10M12 20V4M19 20v-7" />
    </svg>
  );
}

export function WikiIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5.5c2-1 5-1 8 .5v13c-3-1.5-6-1.5-8-.5Z" />
      <path d="M20 5.5c-2-1-5-1-8 .5v13c3-1.5 6-1.5 8-.5Z" />
    </svg>
  );
}

export function MateGourd({ className }: IconProps) {
  // Empty-state illustration: a mate gourd with a bombilla resting in it.
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <ellipse cx="48" cy="82" rx="30" ry="6" fill="var(--parchment-200)" />
      <path d="M28 42a20 20 0 0 0 40 0v-1H28v1Z" fill="var(--green-600)" />
      <path d="M26 38h44l-3.5 6.5H29.5L26 38Z" fill="var(--parchment-300)" />
      <path d="M31 47a17 17 0 0 0 34 0" stroke="var(--green-800)" strokeWidth="1.4" opacity=".4" />
      <rect x="44" y="18" width="6" height="32" rx="3" fill="var(--espresso-600)" transform="rotate(18 47 34)" />
      <circle cx="61" cy="22" r="4.5" fill="var(--espresso-700)" />
      <path d="M39 62c-2.4-4.5-2.4-9 0-13.5" stroke="var(--green-300)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
