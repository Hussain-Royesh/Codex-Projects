import { DynamicPlayersGrid } from "@/components/DynamicContent";
import { LocalizedText } from "@/components/LocalizedText";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeader } from "@/components/SectionHeader";
import { coaches, players } from "@/data/site";

export const metadata = {
  title: "Team | Afghanistan Futsal"
};

export default function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow={{ en: "Squad", fa: "تیم" }}
        title={{ en: "The national futsal group", fa: "گروه فوتسال ملی" }}
        summary={{
          en: "A focused roster presentation for player identity, roles, and matchday readiness.",
          fa: "نمایش منظم بازیکنان، نقش‌ها و آمادگی روز مسابقه."
        }}
      />

      <section className="mx-auto w-[min(1180px,calc(100%-32px))] pb-20">
        <SectionHeader
          eyebrow={{ en: "Technical staff", fa: "کادر فنی" }}
          title={{ en: "Built around clarity", fa: "ساخته شده بر پایه وضاحت" }}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {coaches.map((coach) => (
            <article
              key={coach.id}
              className="sport-card grid overflow-hidden rounded-3xl md:grid-cols-[0.8fr_1fr]"
            >
              <img src={coach.photo} alt={coach.name} className="h-full min-h-64 w-full object-cover" />
              <div className="flex flex-col justify-end p-6">
                <p className="font-mono text-sm font-black text-afghan-gold">
                  <LocalizedText value={coach.role} />
                </p>
                <h2 className="mt-2 font-display text-3xl font-black light-text">{coach.name}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--page-soft)] py-20">
        <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
          <SectionHeader
            eyebrow={{ en: "Players", fa: "بازیکنان" }}
            title={{ en: "Roster profiles", fa: "پروفایل‌های تیم" }}
            summary={{
              en: "These cards now refresh from the backend, so admin changes appear on the website.",
              fa: "این کارت‌ها اکنون از بک‌اند تازه می‌شوند، پس تغییرات مدیر در سایت دیده می‌شود."
            }}
          />
          <div className="mt-10">
            <DynamicPlayersGrid initialPlayers={players} />
          </div>
        </div>
      </section>
    </>
  );
}
