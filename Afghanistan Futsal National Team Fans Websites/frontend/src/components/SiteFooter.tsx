"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brandName, navigation, sponsors } from "@/data/site";
import { usePreferences } from "@/components/PreferencesProvider";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const { locale, ui } = usePreferences();
  const isPersian = locale === "fa";
  const labelClass = cn(
    "mb-4 text-afghan-gold",
    isPersian
      ? "font-sans text-sm font-extrabold leading-6"
      : "font-mono text-sm font-black"
  );
  const brandTitleClass = cn(
    "light-text",
    isPersian
      ? "font-sans text-xl font-extrabold leading-7"
      : "font-display text-xl font-black"
  );
  const navLinkClass = isPersian
    ? "font-sans text-[0.95rem] font-bold leading-6"
    : "text-sm";

  return (
    <footer className="border-t border-white/10 bg-ink-950/70">
      <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="relative grid size-12 place-items-center overflow-hidden rounded-full border border-white/15 bg-ink-950 font-mono text-sm font-black text-white">
              <span className="absolute inset-x-0 top-0 h-1.5 bg-afghan-red" />
              <span className="absolute inset-x-0 bottom-0 h-1.5 bg-afghan-green" />
              AF
            </span>
            <div>
              <p className={brandTitleClass}>{brandName[locale]}</p>
              <p className="text-sm muted-text">{ui("builtFor")}</p>
            </div>
          </div>
          <p className="max-w-sm text-sm muted-text">{ui("footerLine")}</p>
          <div className="h-1.5 w-36 rounded-full afghan-rail" />
        </div>

        <div>
          <p className={labelClass}>{ui("quickLinks")}</p>
          <div className="grid gap-2">
            {navigation.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-xl border border-transparent py-1.5 muted-text transition hover:text-[var(--text)]",
                  navLinkClass
                )}
              >
                {item.label[locale]}
                <ArrowUpRight className="opacity-0 transition group-hover:opacity-100" size={14} />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className={labelClass}>{ui("partners")}</p>
          <div className="grid grid-cols-2 gap-3">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-sm font-black light-text">{sponsor.name}</p>
                <p className="text-xs muted-text">{sponsor.tier[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs muted-text">
        © 2026 Afghanistan Futsal National Team
      </div>
    </footer>
  );
}
