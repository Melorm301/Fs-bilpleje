import { AlertTriangle, Info } from "lucide-react";
import type { ReactNode } from "react";

type NoticeProps = {
  children: ReactNode;
  tone?: "info" | "attention";
  className?: string;
};

/** Rolig informationsboks til pladsholdere og juridiske forbehold. */
export function Notice({ children, tone = "info", className = "" }: NoticeProps) {
  const Icon = tone === "attention" ? AlertTriangle : Info;
  const accent =
    tone === "attention" ? "border-l-ink bg-mist" : "border-l-silver bg-mist/70";
  return (
    <div
      className={`flex gap-3 border-l-2 px-4 py-3 text-sm text-ink-soft ${accent} ${className}`}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink" />
      <div className="space-y-1">{children}</div>
    </div>
  );
}
