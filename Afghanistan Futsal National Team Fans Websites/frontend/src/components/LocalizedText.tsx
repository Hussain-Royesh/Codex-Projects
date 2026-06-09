"use client";

import type { LocalizedString } from "@/types/site";
import { usePreferences } from "@/components/PreferencesProvider";

export function useLocalizedText(value: LocalizedString) {
  const { locale } = usePreferences();
  return value[locale];
}

export function LocalizedText({ value }: { value: LocalizedString }) {
  const text = useLocalizedText(value);
  return <>{text}</>;
}
