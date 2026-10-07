import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Forsinkelse i millisekunder, saa elementer kan trappe ind. */
  delay?: number;
  as?: ElementType;
};

/**
 * Marker et element til scroll-reveal. Selve animationen ligger i CSS og
 * kraever JavaScript for at blive aktiv, saa indholdet altid er synligt i den
 * statiske HTML.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag className={className} data-reveal="" style={style}>
      {children}
    </Tag>
  );
}
