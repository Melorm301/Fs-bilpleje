/**
 * Ensretter en sti, så "/kontakt" og "/kontakt/" behandles ens.
 * GitHub Pages serverer undersider med afsluttende skråstreg, mens
 * routeren internt arbejder uden.
 */
export function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function isActivePath(pathname: string, target: string): boolean {
  return normalizePath(pathname) === normalizePath(target);
}
