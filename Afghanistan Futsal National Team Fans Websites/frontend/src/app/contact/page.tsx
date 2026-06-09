import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Contact | Afghanistan Futsal"
};

const channels = [
  {
    icon: Mail,
    title: { en: "Media", fa: "رسانه" },
    value: "media@afghanistanfutsal.test"
  },
  {
    icon: MessageCircle,
    title: { en: "Supporters", fa: "هواداران" },
    value: "supporters@afghanistanfutsal.test"
  },
  {
    icon: MapPin,
    title: { en: "Community", fa: "اجتماع" },
    value: "Kabul / Global fan network"
  }
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow={{ en: "Contact", fa: "تماس" }}
        title={{ en: "Connect with the futsal community", fa: "با جامعه فوتسال وصل شوید" }}
        summary={{
          en: "A professional contact surface for supporters, media requests, and partnership conversations.",
          fa: "مسیر تماس حرفه‌ای برای هواداران، درخواست‌های رسانه‌ای و گفت‌وگوهای همکاری."
        }}
      />

      <section className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-8 pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <SectionHeader
            eyebrow={{ en: "Channels", fa: "کانال‌ها" }}
            title={{ en: "Direct lines", fa: "راه‌های مستقیم" }}
          />
          <div className="grid gap-3">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <article key={channel.value} className="sport-card rounded-3xl p-5">
                  <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-white text-ink-950">
                    <Icon size={20} />
                  </div>
                  <p className="font-display text-xl font-black light-text">
                    <LocalizedText value={channel.title} />
                  </p>
                  <p className="mt-1 text-sm muted-text">{channel.value}</p>
                </article>
              );
            })}
          </div>
        </div>

        <form className="glass-panel rounded-3xl p-5 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="field-label">
              <LocalizedText value={{ en: "Name", fa: "نام" }} />
              <input
                className="field-control"
                placeholder="Ahmad"
              />
            </label>
            <label className="field-label">
              <LocalizedText value={{ en: "Email", fa: "ایمیل" }} />
              <input
                type="email"
                className="field-control"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="field-label mt-5">
            <LocalizedText value={{ en: "Message", fa: "پیام" }} />
            <textarea
              rows={7}
              className="field-control"
              placeholder="Share your message"
            />
          </label>
          <button
            type="button"
            className="action-primary mt-6"
          >
            <Send size={18} />
            <LocalizedText value={{ en: "Send message", fa: "فرستادن پیام" }} />
          </button>
        </form>
      </section>
    </>
  );
}
