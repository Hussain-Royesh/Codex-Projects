"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Menu, Moon, Shield, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brandName, navigation } from "@/data/site";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/components/PreferencesProvider";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { locale, theme, toggleLocale, toggleTheme, ui } = usePreferences();
  const isPersian = locale === "fa";
  const navTextClass = isPersian
    ? "font-sans text-[0.96rem] font-bold leading-6"
    : "text-sm font-extrabold";
  const controlTextClass = isPersian
    ? "font-sans text-[0.92rem] font-bold leading-6"
    : "text-sm font-black";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[var(--nav)] backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-20 w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label={brandName[locale]}>
          <span className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-white/15 bg-ink-950 font-mono text-sm font-black text-white shadow-lift">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-afghan-red" />
            <span className="absolute inset-x-0 bottom-0 h-1.5 bg-afghan-green" />
            AF
          </span>
          <span className="grid leading-none">
            <span
              className={cn(
                "text-afghan-gold",
                isPersian
                  ? "font-sans text-[0.78rem] font-extrabold leading-5"
                  : "font-mono text-[0.72rem] font-bold uppercase"
              )}
            >
              {isPersian ? "تیم ملی" : "National Team"}
            </span>
            <span
              className={cn(
                "light-text",
                isPersian
                  ? "font-sans text-[1.05rem] font-extrabold leading-6"
                  : "font-display text-base font-black"
              )}
            >
              {brandName[locale]}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 transition hover:bg-white/10",
                  navTextClass,
                  isActive ? "bg-white/10 light-text" : "muted-text"
                )}
              >
                {item.label[locale]}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/10 light-text transition hover:-translate-y-0.5 hover:bg-white/15"
            aria-label={ui("theme")}
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            className={cn(
              "hidden h-10 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 light-text transition hover:-translate-y-0.5 hover:bg-white/15 sm:flex",
              controlTextClass
            )}
            aria-label={ui("language")}
          >
            <Languages size={17} />
            {ui("language")}
          </button>
          <Link
            href="/admin"
            className={cn(
              "hidden h-10 items-center gap-2 rounded-full bg-white px-4 text-ink-950 transition hover:-translate-y-0.5 hover:bg-afghan-gold md:flex",
              controlTextClass
            )}
          >
            <Shield size={16} />
            {ui("admin")}
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/10 light-text lg:hidden"
            aria-label={isOpen ? ui("closeMenu") : ui("openMenu")}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "mx-auto w-[min(1180px,calc(100%-32px))] overflow-hidden transition-all duration-300 lg:hidden",
          isOpen ? "max-h-[520px] pb-5" : "max-h-0"
        )}
      >
        <div className="glass-panel grid gap-2 rounded-2xl p-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-4 py-3 text-start transition",
                navTextClass,
                pathname === item.href ? "bg-white text-ink-950" : "muted-text hover:bg-white/10"
              )}
            >
              {item.label[locale]}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleLocale}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-3 muted-text hover:bg-white/10",
              controlTextClass
            )}
          >
            <Languages size={17} />
            {ui("language")}
          </button>
        </div>
      </div>
    </header>
  );
}
