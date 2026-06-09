import type { LocalizedString } from "@/types/site";
import { LocalizedText } from "@/components/LocalizedText";

type SectionHeaderProps = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  summary?: LocalizedString;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  summary,
  align = "left"
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow mb-3">
        <LocalizedText value={eyebrow} />
      </p>
      <h2 className="font-display text-3xl font-black leading-tight light-text md:text-4xl">
        <LocalizedText value={title} />
      </h2>
      {summary ? (
        <p className="mt-4 text-base muted-text md:text-lg">
          <LocalizedText value={summary} />
        </p>
      ) : null}
    </div>
  );
}
