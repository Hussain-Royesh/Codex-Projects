import { Activity, Flag, Goal, HeartHandshake } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeader } from "@/components/SectionHeader";
import { siteStats } from "@/data/site";

export const metadata = {
  title: "About | Afghanistan Futsal"
};

const values = [
  {
    icon: Flag,
    title: { en: "National color", fa: "رنگ ملی" },
    text: {
      en: "A visual system rooted in Afghanistan’s black, red, and green identity.",
      fa: "سیستم بصری ریشه‌دار در هویت سیاه، سرخ و سبز افغانستان."
    }
  },
  {
    icon: Activity,
    title: { en: "Futsal tempo", fa: "ریتم فوتسال" },
    text: {
      en: "Short actions, fast decisions, clean transitions, and high-pressure moments.",
      fa: "حرکت‌های کوتاه، تصمیم سریع، انتقال پاک و لحظه‌های فشار بالا."
    }
  },
  {
    icon: HeartHandshake,
    title: { en: "Supporter first", fa: "هوادار در مرکز" },
    text: {
      en: "Built around the people following the team from everywhere.",
      fa: "ساخته شده برای هوادارانی که تیم را از هر جا دنبال می‌کنند."
    }
  },
  {
    icon: Goal,
    title: { en: "Future ready", fa: "آماده آینده" },
    text: {
      en: "Structured for real data, admin workflows, and backend growth.",
      fa: "ساختارمند برای داده واقعی، کارهای مدیریتی و رشد بک‌اند."
    }
  }
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow={{ en: "About", fa: "درباره" }}
        title={{ en: "A modern national-team platform", fa: "پلتفرم مدرن تیم ملی" }}
        summary={{
          en: "The project is designed as a serious digital product for a serious futsal identity.",
          fa: "این پروژه به عنوان محصول دیجیتال جدی برای هویت جدی فوتسال طراحی شده است."
        }}
      />

      <section className="page-shell grid gap-10 pb-20 pt-12 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-6">
          <SectionHeader
            eyebrow={{ en: "Identity", fa: "هویت" }}
            title={{ en: "Minimal, fast, national", fa: "مینیمال، سریع، ملی" }}
            summary={{
              en: "The new frontend follows the AGENTS.md direction: Next.js, TypeScript, Tailwind, reusable components, responsive UI, and a route ready for admin dashboard integration.",
              fa: "فرانت‌اند جدید مسیر AGENTS.md را دنبال می‌کند: نکست، تایپ‌اسکریپت، تیلویند، کامپوننت‌های قابل استفاده، طراحی واکنش‌گرا و مسیر آماده برای داشبورد مدیریت."
            }}
          />
          <div className="h-1.5 w-44 rounded-full afghan-rail" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {siteStats.map((stat) => (
            <div key={stat.label.en} className="sport-card p-5">
              <p className="font-display text-4xl font-black light-text">{stat.value}</p>
              <p className="mt-1 text-sm muted-text">
                <LocalizedText value={stat.label} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-band section-pad">
        <div className="page-shell">
          <SectionHeader
            eyebrow={{ en: "Principles", fa: "اصول" }}
            title={{ en: "Designed for the national game", fa: "طراحی شده برای بازی ملی" }}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title.en} className="sport-card p-5">
                  <div className="icon-tile">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-black light-text">
                    <LocalizedText value={value.title} />
                  </h2>
                  <p className="mt-3 text-sm muted-text">
                    <LocalizedText value={value.text} />
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
