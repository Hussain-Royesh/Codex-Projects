"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { Locale } from "@/types/site";

type Theme = "dark" | "light";

type PreferencesContextValue = {
  locale: Locale;
  theme: Theme;
  toggleLocale: () => void;
  toggleTheme: () => void;
  ui: (key: keyof typeof uiCopy.en) => string;
};

const uiCopy = {
  en: {
    theme: "Theme",
    language: "FA",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    signIn: "Sign in",
    matchCenter: "Match center",
    readMore: "Read more",
    viewAll: "View all",
    admin: "Admin",
    footerLine: "A modern digital home for Afghanistan futsal supporters.",
    quickLinks: "Quick links",
    partners: "Partners",
    builtFor: "Built for the national futsal community"
  },
  fa: {
    theme: "حالت",
    language: "EN",
    openMenu: "باز کردن فهرست",
    closeMenu: "بستن فهرست",
    signIn: "ورود",
    matchCenter: "مرکز بازی",
    readMore: "بیشتر",
    viewAll: "همه",
    admin: "مدیریت",
    footerLine: "خانه دیجیتال مدرن برای هواداران فوتسال افغانستان.",
    quickLinks: "پیوندها",
    partners: "همکاران",
    builtFor: "ساخته شده برای جامعه فوتسال ملی"
  }
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("aft_locale") as Locale | null;
    const savedTheme = window.localStorage.getItem("aft_theme") as Theme | null;

    if (savedLocale === "en" || savedLocale === "fa") {
      setLocale(savedLocale);
    }

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "fa" ? "fa-AF" : "en";
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("aft_locale", locale);
    window.localStorage.setItem("aft_theme", theme);
  }, [locale, theme]);

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === "en" ? "fa" : "en"));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      locale,
      theme,
      toggleLocale,
      toggleTheme,
      ui: (key) => uiCopy[locale][key]
    }),
    [locale, theme, toggleLocale, toggleTheme]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }

  return context;
}
