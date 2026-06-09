import type {
  Coach,
  GalleryItem,
  LocalizedString,
  Match,
  NewsItem,
  Player,
  Sponsor,
  Stat
} from "@/types/site";

export const brandName: LocalizedString = {
  en: "Afghanistan Futsal",
  fa: "فوتسال افغانستان"
};

export const navigation = [
  { href: "/", label: { en: "Home", fa: "خانه" } },
  { href: "/team", label: { en: "Team", fa: "تیم" } },
  { href: "/fixtures", label: { en: "Fixtures", fa: "بازی‌ها" } },
  { href: "/gallery", label: { en: "Gallery", fa: "گالری" } },
  { href: "/about", label: { en: "About", fa: "درباره" } },
  { href: "/contact", label: { en: "Contact", fa: "تماس" } },
  { href: "/admin", label: { en: "Admin", fa: "مدیریت" } }
] as const;

export const siteStats: Stat[] = [
  { value: "2026", label: { en: "Digital season", fa: "فصل دیجیتال" } },
  { value: "8", label: { en: "Featured players", fa: "بازیکن برجسته" } },
  { value: "4", label: { en: "Upcoming moments", fa: "رویداد آینده" } }
];

export const players: Player[] = [
  {
    id: "p-1",
    name: "Jawad Safari",
    position: { en: "Goalkeeper", fa: "دروازه‌بان" },
    jerseyNumber: 1,
    age: 25,
    height: "180 cm",
    photo: "/images/mohammad-jawad-safari.webp",
    profile: {
      en: "Commanding presence built for fast resets and confident distribution.",
      fa: "حضور مطمئن برای شروع دوباره سریع و پخش دقیق توپ."
    }
  },
  {
    id: "p-2",
    name: "Mehran Ghulami",
    position: { en: "Pivot", fa: "Pivot" },
    jerseyNumber: 6,
    age: 23,
    height: "176 cm",
    photo: "/images/mehran-ghulami.webp",
    profile: {
      en: "Organizes the press and protects the central lane under pressure.",
      fa: "پرس را تنظیم می‌کند و مسیر مرکزی را زیر فشار حفظ می‌کند."
    }
  },
  {
    id: "p-3",
    name: "Player Three",
    position: { en: "Wing", fa: "وینگر" },
    jerseyNumber: 7,
    age: 23,
    height: "172 cm",
    photo: "/images/player-placeholder.svg",
    profile: {
      en: "Direct runner with a sharp first touch and quick finishing instinct.",
      fa: "بازیکن سرعتی با لمس اول خوب و غریزه تمام‌کنندگی سریع."
    }
  },
  {
    id: "p-4",
    name: "Player Four",
    position: { en: "Pivot", fa: "پیوت" },
    jerseyNumber: 9,
    age: 26,
    height: "178 cm",
    photo: "/images/player-placeholder.svg",
    profile: {
      en: "Holds the ball in tight spaces and brings runners into play.",
      fa: "توپ را در فضاهای تنگ حفظ می‌کند و هم‌تیمی‌ها را وارد حمله می‌سازد."
    }
  },
  {
    id: "p-5",
    name: "Player Five",
    position: { en: "Universal", fa: "یونیورسال" },
    jerseyNumber: 10,
    age: 25,
    height: "174 cm",
    photo: "/images/player-placeholder.svg",
    profile: {
      en: "Flexible profile for rotations, transitions, and late attacking runs.",
      fa: "بازیکن چندکاره برای چرخش‌ها، انتقال‌ها و نفوذهای دیرهنگام."
    }
  },
  {
    id: "p-6",
    name: "Player Six",
    position: { en: "Wing", fa: "وینگر" },
    jerseyNumber: 11,
    age: 22,
    height: "170 cm",
    photo: "/images/player-placeholder.svg",
    profile: {
      en: "High-energy wide player who stretches defensive shape.",
      fa: "بازیکن کناری پرانرژی که ساختار دفاعی حریف را باز می‌کند."
    }
  },
  {
    id: "p-7",
    name: "Player Seven",
    position: { en: "Defender", fa: "مدافع" },
    jerseyNumber: 14,
    age: 28,
    height: "181 cm",
    photo: "/images/player-placeholder.svg",
    profile: {
      en: "Experienced defender with calm timing and strong recovery runs.",
      fa: "مدافع باتجربه با زمان‌بندی آرام و بازگشت‌های دفاعی قوی."
    }
  },
  {
    id: "p-8",
    name: "Player Eight",
    position: { en: "Goalkeeper", fa: "دروازه‌بان" },
    jerseyNumber: 16,
    age: 21,
    height: "183 cm",
    photo: "/images/player-placeholder.svg",
    profile: {
      en: "Young shot-stopper with reach, reactions, and matchday focus.",
      fa: "دروازه‌بان جوان با واکنش سریع، قد مناسب و تمرکز مسابقه."
    }
  }
];

export const coaches: Coach[] = [
  {
    id: "c-1",
    name: "Head Coach",
    role: { en: "Technical identity and match model", fa: "هویت فنی و مدل بازی" },
    photo: "/images/training-placeholder.svg"
  },
  {
    id: "c-2",
    name: "Assistant Coach",
    role: { en: "Sessions, analysis, and transitions", fa: "تمرین، تحلیل و انتقال‌ها" },
    photo: "/images/court-placeholder.svg"
  }
];

export const matches: Match[] = [
  {
    id: "m-1",
    date: "2026-06-21",
    time: "19:00",
    homeTeam: { en: "Afghanistan", fa: "افغانستان" },
    awayTeam: { en: "Tajikistan", fa: "تاجیکستان" },
    competition: { en: "International Futsal Friendly", fa: "دوستانه بین‌المللی فوتسال" },
    venue: { en: "Venue TBA", fa: "محل برگزاری اعلام می‌شود" },
    status: { en: "Upcoming", fa: "پیش‌رو" },
    note: {
      en: "Preparation match with final venue details to be confirmed.",
      fa: "بازی آماده‌سازی با جزئیات نهایی محل برگزاری در آینده."
    }
  },
  {
    id: "m-2",
    date: "2026-07-05",
    time: "20:30",
    homeTeam: { en: "Afghanistan", fa: "افغانستان" },
    awayTeam: { en: "Uzbekistan", fa: "ازبکستان" },
    competition: { en: "Regional Preparation Match", fa: "بازی آماده‌سازی منطقه‌ای" },
    venue: { en: "Indoor Arena TBA", fa: "سالن سرپوشیده اعلام می‌شود" },
    status: { en: "TBA", fa: "در انتظار تایید" },
    note: {
      en: "Kickoff and ticket information will be updated after confirmation.",
      fa: "زمان آغاز و معلومات بلیت پس از تایید به‌روزرسانی می‌شود."
    }
  },
  {
    id: "m-3",
    date: "2026-07-19",
    time: "18:00",
    homeTeam: { en: "Afghanistan", fa: "افغانستان" },
    awayTeam: { en: "Iran", fa: "ایران" },
    competition: { en: "Continental Warm-Up", fa: "آماده‌سازی قاره‌ای" },
    venue: { en: "Neutral Venue TBA", fa: "محل بی‌طرف اعلام می‌شود" },
    status: { en: "Upcoming", fa: "پیش‌رو" },
    note: {
      en: "High-tempo test against a strong regional futsal opponent.",
      fa: "آزمون پرسرعت برابر یکی از رقبای قدرتمند منطقه."
    }
  },
  {
    id: "m-4",
    date: "2026-08-18",
    time: "17:30",
    homeTeam: { en: "Afghanistan", fa: "افغانستان" },
    awayTeam: { en: "Opponent TBA", fa: "حریف اعلام می‌شود" },
    competition: { en: "Fan Watch Party", fa: "گردهمایی هواداران" },
    venue: { en: "Community location TBA", fa: "محل اجتماعی اعلام می‌شود" },
    status: { en: "Fan Event", fa: "رویداد هواداری" },
    note: {
      en: "Supporter gathering details will be shared when the event plan is confirmed.",
      fa: "جزئیات گردهمایی هواداران پس از تایید برنامه شریک می‌شود."
    }
  }
];

export const news: NewsItem[] = [
  {
    id: "n-1",
    title: {
      en: "Matchday hub opens for Afghanistan futsal supporters",
      fa: "مرکز روز مسابقه برای هواداران فوتسال افغانستان فعال شد"
    },
    date: "2026-06-05",
    category: { en: "Team News", fa: "خبر تیم" },
    summary: {
      en: "A cleaner digital home brings squad profiles, fixtures, media, and supporter updates together.",
      fa: "خانه دیجیتال منظم‌تر، پروفایل بازیکنان، بازی‌ها، رسانه و اخبار هواداری را یکجا می‌کند."
    },
    image: "/images/match-placeholder.svg",
    href: "/fixtures"
  },
  {
    id: "n-2",
    title: {
      en: "Supporters prepare for the summer fixture run",
      fa: "هواداران برای برنامه بازی‌های تابستان آماده می‌شوند"
    },
    date: "2026-06-03",
    category: { en: "Supporters", fa: "هواداران" },
    summary: {
      en: "Community groups are planning watch-party moments and matchday coverage.",
      fa: "گروه‌های اجتماعی برای گردهمایی و پوشش روز مسابقه برنامه‌ریزی می‌کنند."
    },
    image: "/images/fans-placeholder.svg",
    href: "/contact"
  },
  {
    id: "n-3",
    title: {
      en: "Core squad profiles refreshed for the new cycle",
      fa: "پروفایل‌های اصلی تیم برای دوره تازه به‌روزرسانی شد"
    },
    date: "2026-06-01",
    category: { en: "Squad", fa: "تیم" },
    summary: {
      en: "Player profiles are structured for quick updates as official roster details arrive.",
      fa: "پروفایل بازیکنان برای به‌روزرسانی سریع با اطلاعات رسمی آماده شده است."
    },
    image: "/images/player-placeholder.svg",
    href: "/team"
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    title: { en: "National colors under arena lights", fa: "رنگ‌های ملی زیر نور سالن" },
    category: { en: "Matchday", fa: "روز مسابقه" },
    image: "/images/hero-arena.png"
  },
  {
    id: "g-2",
    title: { en: "Training intensity", fa: "شدت تمرین" },
    category: { en: "Training", fa: "تمرین" },
    image: "/images/training-placeholder.svg"
  },
  {
    id: "g-3",
    title: { en: "Supporter energy", fa: "انرژی هواداران" },
    category: { en: "Fans", fa: "هواداران" },
    image: "/images/fans-placeholder.svg"
  },
  {
    id: "g-4",
    title: { en: "Indoor court detail", fa: "جزئیات زمین سالنی" },
    category: { en: "Arena", fa: "سالن" },
    image: "/images/court-placeholder.svg"
  },
  {
    id: "g-5",
    title: { en: "Trophy ambition", fa: "آرمان قهرمانی" },
    category: { en: "Identity", fa: "هویت" },
    image: "/images/trophy-placeholder.svg"
  },
  {
    id: "g-6",
    title: { en: "Match preparation", fa: "آمادگی مسابقه" },
    category: { en: "Matchday", fa: "روز مسابقه" },
    image: "/images/match-placeholder.svg"
  }
];

export const sponsors: Sponsor[] = [
  { id: "s-1", name: "Pamir Air", tier: { en: "Travel Partner", fa: "همکار سفر" } },
  { id: "s-2", name: "Kabul Bank", tier: { en: "Finance Partner", fa: "همکار مالی" } },
  { id: "s-3", name: "Hindukush Sports", tier: { en: "Performance Partner", fa: "همکار عملکرد" } },
  { id: "s-4", name: "Ariana Media", tier: { en: "Media Partner", fa: "همکار رسانه‌ای" } }
];
