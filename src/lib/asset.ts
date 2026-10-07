const rawBase = import.meta.env.BASE_URL || "/";

/** Base-stien med afsluttende skråstreg, fx "/Fs-bilpleje/". */
export const basePath = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

/** Bygger en absolut sti til en fil i public/ der virker under et vilkårligt base-path. */
export function asset(path: string): string {
  const clean = path.replace(/^\/+/, "");
  return `${basePath}${clean}`;
}
