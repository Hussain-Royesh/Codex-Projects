import { GalleryCard } from "@/components/Cards";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeader } from "@/components/SectionHeader";
import { galleryItems } from "@/data/site";

export const metadata = {
  title: "Gallery | Afghanistan Futsal"
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow={{ en: "Media", fa: "رسانه" }}
        title={{ en: "Visual archive", fa: "آرشیف تصویری" }}
        summary={{
          en: "Matchday scenes, training detail, supporter culture, and national-team identity in one clean media grid.",
          fa: "صحنه‌های مسابقه، تمرین، فرهنگ هواداری و هویت تیم ملی در یک گرید منظم."
        }}
      />

      <section className="mx-auto w-[min(1180px,calc(100%-32px))] pb-24">
        <SectionHeader
          eyebrow={{ en: "Gallery", fa: "گالری" }}
          title={{ en: "Moments with space to breathe", fa: "لحظه‌ها با فضای کافی" }}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
