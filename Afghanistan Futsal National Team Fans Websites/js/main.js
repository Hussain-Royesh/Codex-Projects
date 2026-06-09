const STORAGE_KEYS = {
  theme: "afghanistan-futsal-theme",
  language: "afghanistan-futsal-language"
};

const defaultTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
let currentTheme = localStorage.getItem(STORAGE_KEYS.theme) || defaultTheme;
let currentLanguage = localStorage.getItem(STORAGE_KEYS.language) || "en";

const translations = {
  "Skip to content": "رفتن به محتوای اصلی",
  "Afghanistan Futsal": "فوتسال افغانستان",
  "National Team": "تیم ملی",
  "Toggle navigation": "باز و بسته کردن منو",
  "Home": "خانه",
  "Team": "تیم",
  "Fixtures": "بازی‌ها",
  "Gallery": "گالری",
  "About": "درباره",
  "Contact": "تماس",
  "Afghanistan national futsal": "فوتسال ملی افغانستان",
  "Built For The Fastest Court": "ساخته شده برای سریع‌ترین میدان",
  "A modern home for Afghanistan futsal: elite player profiles, match center updates, national team news, and the supporters behind every moment.": "خانه‌ای مدرن برای فوتسال افغانستان: پروفایل بازیکنان، مرکز بازی‌ها، خبرهای تیم ملی و هوادارانی که پشت هر لحظه ایستاده‌اند.",
  "Match Center": "مرکز بازی‌ها",
  "Explore Squad": "مشاهده تیم",
  "Team highlights": "نکات برجسته تیم",
  "High-speed futsal identity": "هویت فوتسال پرسرعت",
  "Minutes of pressure": "دقیقه فشار",
  "National colors, global energy": "رنگ‌های ملی، انرژی جهانی",
  "Featured players": "بازیکنان برجسته",
  "Faces Of The Squad": "چهره‌های تیم",
  "Dynamic squad cards pull directly from the roster data file, keeping the player section clean, fast, and easy to update.": "کارت‌های تیم به‌صورت پویا از فایل فهرست بازیکنان بارگذاری می‌شوند تا بخش بازیکنان ساده، سریع و قابل به‌روزرسانی باشد.",
  "Full Squad": "تمام تیم",
  "Loading featured players...": "در حال بارگذاری بازیکنان برجسته...",
  "Match center": "مرکز بازی‌ها",
  "Next Match Window": "پنجره بازی بعدی",
  "Upcoming fixtures are sorted automatically from the match schedule. Replace the sample data with confirmed competitions, venues, and kickoff times.": "بازی‌های آینده به‌صورت خودکار از برنامه مسابقات مرتب می‌شوند. داده‌های نمونه را با رقابت‌ها، مکان‌ها و زمان‌های تاییدشده جایگزین کنید.",
  "View All Fixtures": "مشاهده همه بازی‌ها",
  "Loading upcoming matches...": "در حال بارگذاری بازی‌های آینده...",
  "Latest news": "آخرین خبرها",
  "Inside The Team": "درون تیم",
  "A minimal newsroom for squad updates, matchday stories, gallery announcements, and national futsal moments.": "یک بخش خبری ساده برای به‌روزرسانی تیم، داستان‌های روز مسابقه، اعلان‌های گالری و لحظه‌های فوتسال ملی.",
  "Loading latest news...": "در حال بارگذاری آخرین خبرها...",
  "Partners": "همکاران",
  "Sponsors": "حامیان",
  "A clean partner area for federation, event, broadcast, and community sponsors.": "بخش ساده و حرفه‌ای برای حامیان فدراسیون، رویدادها، پخش و جامعه.",
  "Ariana Sports": "آریانا اسپورت",
  "Kabul Arena": "کابل آرینا",
  "Herat Energy": "انرژی هرات",
  "Futsal Future": "آینده فوتسال",
  "A premium digital home for Afghanistan futsal fixtures, squad profiles, news, gallery moments, and matchday culture.": "خانه دیجیتال ممتاز برای بازی‌ها، پروفایل تیم، خبرها، لحظه‌های گالری و فرهنگ روز مسابقه فوتسال افغانستان.",
  "Explore": "کاوش",
  "Community": "جامعه",
  "Team updates": "به‌روزرسانی‌های تیم",
  "Website Scope": "دامنه وب‌سایت",
  "Built as a modern frontend experience with editable content data and reusable components.": "ساخته شده به‌عنوان یک تجربه مدرن فرانت‌اند با داده‌های قابل ویرایش و اجزای قابل استفاده دوباره.",
  "2026 Afghanistan Futsal National Team. All rights reserved.": "۲۰۲۶ تیم ملی فوتسال افغانستان. همه حقوق محفوظ است.",
  "Squad profiles": "پروفایل تیم",
  "Core Squad": "هسته تیم",
  "Player cards": "کارت‌های بازیکنان",
  "A clean squad overview showing the roles, qualities, and personalities that shape Afghanistan futsal.": "نمایی ساده از تیم که نقش‌ها، ویژگی‌ها و شخصیت‌هایی را نشان می‌دهد که فوتسال افغانستان را شکل می‌دهند.",
  "Dynamic player profiles are loaded from the roster data file and can be updated with confirmed names, photos, and details.": "پروفایل بازیکنان به‌صورت پویا از فایل فهرست تیم بارگذاری می‌شود و با نام‌ها، عکس‌ها و جزئیات تاییدشده قابل به‌روزرسانی است.",
  "Loading player profiles...": "در حال بارگذاری پروفایل بازیکنان...",
  "Technical identity": "هویت فنی",
  "Fast Rotations, Brave Pressure": "چرخش سریع، فشار شجاعانه",
  "Futsal rewards tactical discipline and imagination. This page is structured to support player bios, role descriptions, and future match stats.": "فوتسال به نظم تاکتیکی و خلاقیت پاداش می‌دهد. این صفحه برای پشتیبانی از معرفی بازیکنان، نقش‌ها و آمار آینده طراحی شده است.",
  "Squad strengths": "نقاط قوت تیم",
  "Compact team shape with quick recovery runs.": "ساختار فشرده تیم با بازگشت‌های سریع.",
  "Technical players comfortable in tight spaces.": "بازیکنان تکنیکی که در فضاهای تنگ راحت بازی می‌کنند.",
  "Supporter culture that carries national team energy across the global Afghan community.": "فرهنگ هواداری که انرژی تیم ملی را در جامعه جهانی افغان‌ها منتقل می‌کند.",
  "Flexible roster cards for confirmed squad updates.": "کارت‌های منعطف تیم برای به‌روزرسانی‌های تاییدشده.",
  "Match center": "مرکز بازی‌ها",
  "Fixtures": "بازی‌ها",
  "A responsive matchday layout for upcoming games, venue notes, and recent results.": "چیدمانی واکنش‌گرا برای بازی‌های آینده، یادداشت‌های مکان و نتایج اخیر.",
  "Upcoming": "آینده",
  "Next Matches": "بازی‌های بعدی",
  "Upcoming fixtures are loaded from the shared match schedule and sorted by date.": "بازی‌های آینده از برنامه مشترک مسابقات بارگذاری و بر اساس تاریخ مرتب می‌شوند.",
  "Results format": "قالب نتایج",
  "Recent Results": "نتایج اخیر",
  "A clean table pattern for results, competitions, and match notes.": "یک جدول ساده برای نتایج، رقابت‌ها و یادداشت‌های مسابقه.",
  "Date": "تاریخ",
  "Match": "مسابقه",
  "Competition": "رقابت",
  "Result": "نتیجه",
  "Notes": "یادداشت‌ها",
  "Sample": "نمونه",
  "Afghanistan vs Team A": "افغانستان مقابل تیم الف",
  "Afghanistan vs Team B": "افغانستان مقابل تیم ب",
  "Afghanistan vs Team C": "افغانستان مقابل تیم ج",
  "Friendly": "بازی دوستانه",
  "Qualifier": "مقدماتی",
  "Tournament": "تورنمنت",
  "Replace with official result": "با نتیجه تاییدشده جایگزین شود",
  "Update after confirmation": "پس از تایید به‌روزرسانی شود",
  "Placeholder row": "ردیف نمونه",
  "Visual archive": "آرشیف تصویری",
  "Team Gallery": "گالری تیم",
  "A premium responsive gallery for match action, training scenes, supporter culture, and milestone moments.": "گالری واکنش‌گرا و ممتاز برای صحنه‌های مسابقه، تمرین، فرهنگ هواداری و لحظه‌های مهم.",
  "Moments": "لحظه‌ها",
  "Filter the gallery by category. Replace placeholders with approved team, media, or supporter images when available.": "گالری را بر اساس دسته‌بندی فیلتر کنید. جای‌نگهدارها را با تصاویر تاییدشده تیم، رسانه یا هواداران جایگزین کنید.",
  "All": "همه",
  "Training": "تمرین",
  "Supporters": "هواداران",
  "Match Night": "شب مسابقه",
  "Atmosphere, pressure, and bright court lights.": "فضا، فشار و نورهای روشن میدان.",
  "Training Tempo": "ریتم تمرین",
  "Preparation work, tactical patterns, and finishing drills.": "آمادگی، الگوهای تاکتیکی و تمرین‌های پایانی.",
  "Supporter Stand": "جایگاه هواداران",
  "National colors, matchday rituals, and community energy.": "رنگ‌های ملی، آیین‌های روز مسابقه و انرژی جامعه.",
  "Court Focus": "تمرکز میدان",
  "Shapes, rotations, and the rhythm of futsal.": "چیدمان، چرخش‌ها و ریتم فوتسال.",
  "Milestone Moment": "لحظه مهم",
  "Space for trophies, awards, and historic match memories.": "جایی برای جام‌ها، جوایز و خاطره‌های تاریخی مسابقه.",
  "Player Focus": "تمرکز بر بازیکن",
  "Portrait slots for squad announcements and feature stories.": "جایگاه تصویر برای اعلان‌های تیم و داستان‌های ویژه.",
  "Our purpose": "هدف ما",
  "A polished national team website experience designed to present Afghanistan futsal with clarity, energy, and modern sports storytelling.": "تجربه‌ای صیقل‌یافته برای وب‌سایت تیم ملی که فوتسال افغانستان را با وضوح، انرژی و روایت مدرن ورزشی معرفی می‌کند.",
  "Team mission": "ماموریت تیم",
  "More Than A Scoreline": "فراتر از نتیجه",
  "This website brings together match information, player stories, news, gallery moments, and supporter culture in one polished experience.": "این وب‌سایت اطلاعات مسابقه، داستان‌های بازیکنان، خبرها، لحظه‌های گالری و فرهنگ هواداری را در یک تجربه حرفه‌ای گردهم می‌آورد.",
  "The frontend is built for quick updates, clean navigation, reusable components, and professional sports presentation.": "فرانت‌اند برای به‌روزرسانی سریع، ناوبری ساده، اجزای قابل استفاده دوباره و ارائه حرفه‌ای ورزشی ساخته شده است.",
  "What this site supports": "این سایت چه چیزهایی را پشتیبانی می‌کند",
  "Responsive pages for desktop, tablet, and mobile visitors.": "صفحات واکنش‌گرا برای دسکتاپ، تبلت و موبایل.",
  "Reusable sports cards for players, gallery items, and fixtures.": "کارت‌های ورزشی قابل استفاده دوباره برای بازیکنان، گالری و بازی‌ها.",
  "Glassmorphism panels with modern spacing and hierarchy.": "پنل‌های شیشه‌ای با فاصله‌گذاری و سلسله‌مراتب مدرن.",
  "JSON-powered content sections that can be edited without rebuilding the site.": "بخش‌های محتوایی مبتنی بر JSON که بدون بازسازی سایت قابل ویرایش است.",
  "Roadmap": "نقشه راه",
  "Content Timeline": "زمان‌بندی محتوا",
  "A flexible structure for the website to grow as new team information, media, and match updates become available.": "ساختاری منعطف برای رشد وب‌سایت با اطلاعات جدید تیم، رسانه و به‌روزرسانی مسابقات.",
  "Phase 1": "مرحله ۱",
  "Launch team hub": "راه‌اندازی مرکز تیم",
  "Publish core pages, navigation, footer, responsive layout, and placeholder visuals.": "انتشار صفحات اصلی، ناوبری، فوتر، چیدمان واکنش‌گرا و تصاویر جای‌نگهدار.",
  "Phase 2": "مرحله ۲",
  "Add verified updates": "افزودن به‌روزرسانی‌های تاییدشده",
  "Replace placeholders with confirmed squad, fixtures, official images, and match reports.": "جایگزینی داده‌های نمونه با تیم، بازی‌ها، تصاویر و گزارش‌های تاییدشده.",
  "Phase 3": "مرحله ۳",
  "Grow community features": "گسترش قابلیت‌های جامعه",
  "Add supporter submissions, watch-party information, newsletter content, and featured stories.": "افزودن ارسال‌های هواداران، اطلاعات تماشای گروهی، خبرنامه و داستان‌های ویژه.",
  "Connect": "ارتباط",
  "Send fixture updates, gallery submissions, media notes, supporter stories, or website corrections.": "به‌روزرسانی بازی‌ها، ارسال‌های گالری، یادداشت‌های رسانه‌ای، داستان‌های هواداران یا اصلاحات وب‌سایت را بفرستید.",
  "Contact desk": "میز تماس",
  "Get In Touch": "در تماس شوید",
  "Use this form as a front-end contact experience. It is ready to connect to email, a CMS, or a backend later.": "از این فرم به‌عنوان تجربه تماس فرانت‌اند استفاده کنید. بعدا می‌توان آن را به ایمیل، CMS یا بک‌اند وصل کرد.",
  "Email": "ایمیل",
  "Submissions": "ارسال‌ها",
  "Photos, fixtures, corrections, media notes, and supporter stories": "عکس‌ها، بازی‌ها، اصلاحات، یادداشت‌های رسانه‌ای و داستان‌های هواداران",
  "Response": "پاسخ",
  "Usually reviewed after matchdays and content updates": "معمولا پس از روزهای مسابقه و به‌روزرسانی محتوا بررسی می‌شود",
  "Name": "نام",
  "Topic": "موضوع",
  "Select a topic": "یک موضوع را انتخاب کنید",
  "Fixture update": "به‌روزرسانی بازی",
  "Gallery submission": "ارسال گالری",
  "Media request": "درخواست رسانه‌ای",
  "Supporter story": "داستان هوادار",
  "Website correction": "اصلاح وب‌سایت",
  "Message": "پیام",
  "Send Message": "ارسال پیام",
  "Light": "روشن",
  "Dark": "تاریک",
  "Persian": "فارسی",
  "English": "انگلیسی",
  "Switch to dark theme": "تغییر به حالت تاریک",
  "Switch to light theme": "تغییر به حالت روشن",
  "Switch to English": "تغییر به انگلیسی",
  "Switch to Persian Afghanistan": "تغییر به فارسی افغانستان",
  "Read update": "خواندن خبر",
  "Player profiles could not be loaded. Start the site with a local server and refresh this page.": "پروفایل بازیکنان بارگذاری نشد. سایت را با سرور محلی اجرا کرده و صفحه را تازه کنید.",
  "Upcoming matches could not be loaded. Start the site with a local server and refresh this page.": "بازی‌های آینده بارگذاری نشد. سایت را با سرور محلی اجرا کرده و صفحه را تازه کنید.",
  "No upcoming matches are listed yet.": "هنوز بازی آینده‌ای ثبت نشده است.",
  "News updates could not be loaded. Start the site with a local server and refresh this page.": "خبرها بارگذاری نشد. سایت را با سرور محلی اجرا کرده و صفحه را تازه کنید.",
  "No news updates are available yet.": "هنوز خبری موجود نیست.",
  "Thanks. Your message is ready for review.": "تشکر. پیام شما برای بررسی آماده است.",
  "years": "سال",
  "No.": "شماره"
};

const valueTranslations = {
  "Player One": "بازیکن یک",
  "Player Two": "بازیکن دو",
  "Player Three": "بازیکن سه",
  "Player Four": "بازیکن چهار",
  "Player Five": "بازیکن پنج",
  "Player Six": "بازیکن شش",
  "Player Seven": "بازیکن هفت",
  "Player Eight": "بازیکن هشت",
  "Goalkeeper": "دروازه‌بان",
  "Last Defender": "مدافع آخر",
  "Wing": "کناره",
  "Pivot": "پیوت",
  "Universal": "همه‌کاره",
  "Defender": "مدافع",
  "Afghanistan": "افغانستان",
  "Tajikistan": "تاجیکستان",
  "Uzbekistan": "ازبیکستان",
  "Iran": "ایران",
  "Opponent TBA": "حریف بعدا اعلام می‌شود",
  "International Futsal Friendly": "بازی دوستانه بین‌المللی فوتسال",
  "Regional Preparation Match": "بازی آمادگی منطقه‌ای",
  "Continental Warm-Up": "آمادگی قاره‌ای",
  "Fan Watch Party": "تماشای گروهی هواداران",
  "Venue TBA": "مکان بعدا اعلام می‌شود",
  "Indoor Arena TBA": "سالون داخلی بعدا اعلام می‌شود",
  "Neutral Venue TBA": "مکان بی‌طرف بعدا اعلام می‌شود",
  "Community location TBA": "محل جامعه بعدا اعلام می‌شود",
  "Upcoming": "آینده",
  "TBA": "بعدا اعلام می‌شود",
  "Fan Event": "رویداد هواداری",
  "Preparation match with final venue details to be confirmed.": "بازی آمادگی با جزئیات نهایی مکان که بعدا تایید می‌شود.",
  "Kickoff and ticket information will be updated after confirmation.": "زمان شروع و اطلاعات بلیت پس از تایید به‌روزرسانی می‌شود.",
  "High-tempo test against a strong regional futsal opponent.": "آزمون پرفشار برابر یک حریف قدرتمند منطقه‌ای در فوتسال.",
  "Supporter gathering details will be shared when the event plan is confirmed.": "جزئیات گردهمایی هواداران پس از تایید برنامه رویداد منتشر می‌شود.",
  "Afghanistan Futsal National Team Website Launches Matchday Hub": "وب‌سایت تیم ملی فوتسال افغانستان مرکز روز مسابقه را راه‌اندازی کرد",
  "Supporters Prepare For Summer Fixture Run": "هواداران برای برنامه بازی‌های تابستان آماده می‌شوند",
  "Core Squad Profiles Added To Team Page": "پروفایل هسته تیم به صفحه تیم افزوده شد",
  "Gallery Slots Ready For Fan Submissions": "جایگاه‌های گالری برای ارسال هواداران آماده است",
  "Club News": "خبرهای باشگاه",
  "Team": "تیم",
  "Gallery": "گالری",
  "The website now brings squad profiles, upcoming fixtures, gallery moments, and supporter updates into one modern matchday experience.": "این وب‌سایت اکنون پروفایل تیم، بازی‌های آینده، لحظه‌های گالری و به‌روزرسانی هواداران را در یک تجربه مدرن روز مسابقه جمع کرده است.",
  "Fan groups are preparing watch-party plans and community coverage as the upcoming match schedule begins to take shape.": "گروه‌های هواداری برنامه تماشای گروهی و پوشش جامعه را همزمان با شکل‌گیری برنامه بازی‌های آینده آماده می‌کنند.",
  "The team page now loads player profiles dynamically, making roster updates easier as confirmed information becomes available.": "صفحه تیم اکنون پروفایل بازیکنان را به‌صورت پویا بارگذاری می‌کند و به‌روزرسانی فهرست تیم را آسان‌تر می‌سازد.",
  "The visual archive is ready for match photos, training scenes, supporter images, and milestone moments from the futsal community.": "آرشیف تصویری برای عکس‌های مسابقه، صحنه‌های تمرین، تصاویر هواداران و لحظه‌های مهم جامعه فوتسال آماده است."
};

const originalTextNodes = new WeakMap();

const t = (text) => {
  if (currentLanguage === "en") {
    return text;
  }

  return translations[text] || valueTranslations[text] || text;
};

const formatNumber = (number) => new Intl.NumberFormat(currentLanguage === "fa" ? "fa-AF" : "en").format(number);

const applyStaticTranslations = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;

      if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }

      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes = [];
  let node = walker.nextNode();

  while (node) {
    nodes.push(node);
    node = walker.nextNode();
  }

  nodes.forEach((textNode) => {
    if (!originalTextNodes.has(textNode)) {
      originalTextNodes.set(textNode, textNode.nodeValue);
    }

    const original = originalTextNodes.get(textNode);
    const trimmed = original.trim();
    textNode.nodeValue = currentLanguage === "en" ? original : original.replace(trimmed, t(trimmed));
  });

  document.querySelectorAll("[aria-label], [alt], [placeholder], [title]").forEach((element) => {
    ["aria-label", "alt", "placeholder", "title"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) {
        return;
      }

      const storeKey = `original${attribute.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase())}`;

      if (!element.dataset[storeKey]) {
        element.dataset[storeKey] = element.getAttribute(attribute);
      }

      const original = element.dataset[storeKey];
      element.setAttribute(attribute, currentLanguage === "en" ? original : t(original));
    });
  });
};

const setTheme = (theme) => {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    button.textContent = t(nextTheme === "dark" ? "Dark" : "Light");
    button.setAttribute("aria-label", t(`Switch to ${nextTheme} theme`));
  });
};

const setLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language === "fa" ? "fa-AF" : "en";
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  localStorage.setItem(STORAGE_KEYS.language, language);

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.textContent = language === "fa" ? "EN" : "FA";
    button.setAttribute("aria-label", t(language === "fa" ? "Switch to English" : "Switch to Persian Afghanistan"));
  });

  applyStaticTranslations();
  setTheme(currentTheme);
  loadPlayers();
  loadMatches();
  loadNews();
};

document.documentElement.dataset.theme = currentTheme;

const nav = document.querySelector(".nav");

if (nav) {
  const controls = document.createElement("div");
  controls.className = "site-controls";

  const themeButton = document.createElement("button");
  themeButton.className = "control-button";
  themeButton.type = "button";
  themeButton.dataset.themeToggle = "";
  themeButton.addEventListener("click", () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  const languageButton = document.createElement("button");
  languageButton.className = "control-button";
  languageButton.type = "button";
  languageButton.dataset.languageToggle = "";
  languageButton.addEventListener("click", () => {
    setLanguage(currentLanguage === "en" ? "fa" : "en");
  });

  controls.append(themeButton, languageButton);
  nav.insertBefore(controls, document.querySelector(".nav-toggle"));
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
    }
  });
}

const page = document.body.dataset.page;

if (page) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 })
  : null;

const observeReveal = (element) => {
  if (!element) {
    return element;
  }

  element.dataset.reveal = "";

  if (revealObserver) {
    revealObserver.observe(element);
  } else {
    element.classList.add("is-visible");
  }

  return element;
};

const observeStaticReveals = () => {
  document
    .querySelectorAll(".hero-content, .hero-panel, .section, .page-hero, .card, .fixture, .glass-panel, .sponsor-card, .timeline-item, .stat")
    .forEach(observeReveal);
};

const createTag = (label) => {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = label;
  return tag;
};

const createMessage = (text) => {
  const message = document.createElement("div");
  message.className = "glass-panel roster-message";
  message.textContent = t(text);
  observeReveal(message);
  return message;
};

const playersGrids = document.querySelectorAll("[data-players-grid]");

const localizedValue = (value) => currentLanguage === "fa" ? t(value) : value;

const createPlayerCard = (player) => {
  const card = document.createElement("article");
  card.className = "card player-card";

  const image = document.createElement("img");
  image.src = player.photo || "images/player-placeholder.svg";
  image.alt = `${localizedValue(player.name)} ${currentLanguage === "fa" ? "عکس پروفایل" : "profile photo"}`;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const number = document.createElement("span");
  number.className = "player-number";
  number.textContent = currentLanguage === "fa"
    ? `${t("No.")} ${formatNumber(player.jerseyNumber)}`
    : `No. ${player.jerseyNumber}`;

  const name = document.createElement("h3");
  name.textContent = localizedValue(player.name);

  const position = document.createElement("p");
  position.className = "player-position";
  position.textContent = localizedValue(player.position);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.append(
    createTag(currentLanguage === "fa" ? `${formatNumber(player.age)} ${t("years")}` : `${player.age} years`),
    createTag(currentLanguage === "fa" ? player.height.replace(/\d+/g, (number) => formatNumber(Number(number))).replace("cm", "سانتی‌متر") : player.height)
  );

  body.append(number, name, position, meta);
  card.append(image, body);
  return observeReveal(card);
};

const loadPlayers = async () => {
  if (!playersGrids.length) {
    return;
  }

  try {
    const response = await fetch("players.json");

    if (!response.ok) {
      throw new Error("Unable to load players.json");
    }

    const players = await response.json();

    playersGrids.forEach((grid) => {
      const limit = Number(grid.dataset.playerLimit) || players.length;
      const visiblePlayers = players.slice(0, limit);
      grid.replaceChildren(...visiblePlayers.map(createPlayerCard));
    });
  } catch (error) {
    playersGrids.forEach((grid) => {
      grid.replaceChildren(createMessage("Player profiles could not be loaded. Start the site with a local server and refresh this page."));
    });
  }
};

const matchesGrids = document.querySelectorAll("[data-matches-grid]");

const formatMatchDate = (dateValue) => {
  const date = new Date(`${dateValue}T00:00:00`);
  const locale = currentLanguage === "fa" ? "fa-AF" : "en";

  return {
    day: new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat(locale, { month: "short" }).format(date),
    full: new Intl.DateTimeFormat(locale, {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date)
  };
};

const createMatchCard = (match) => {
  const dateParts = formatMatchDate(match.date);
  const card = document.createElement("article");
  card.className = "fixture";

  const date = document.createElement("div");
  date.className = "fixture-date";

  const month = document.createElement("span");
  month.textContent = dateParts.month;

  const day = document.createElement("strong");
  day.textContent = dateParts.day;

  date.append(month, day);

  const details = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = `${localizedValue(match.homeTeam)} ${currentLanguage === "fa" ? "مقابل" : "vs"} ${localizedValue(match.awayTeam)}`;

  const summary = document.createElement("p");
  summary.textContent = `${localizedValue(match.competition)} / ${localizedValue(match.venue)} / ${dateParts.full}, ${match.time}`;

  const note = document.createElement("p");
  note.className = "fixture-note";
  note.textContent = localizedValue(match.note);

  details.append(title, summary, note);

  const status = document.createElement("span");
  status.className = "fixture-status";
  status.textContent = localizedValue(match.status);

  card.append(date, details, status);
  return observeReveal(card);
};

const loadMatches = async () => {
  if (!matchesGrids.length) {
    return;
  }

  try {
    const response = await fetch("matches.json");

    if (!response.ok) {
      throw new Error("Unable to load matches.json");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const matches = await response.json();
    const upcomingMatches = matches
      .filter((match) => new Date(`${match.date}T00:00:00`) >= today)
      .sort((first, second) => new Date(first.date) - new Date(second.date));

    matchesGrids.forEach((grid) => {
      const limit = Number(grid.dataset.matchLimit) || upcomingMatches.length;
      const visibleMatches = upcomingMatches.slice(0, limit);

      if (!visibleMatches.length) {
        grid.replaceChildren(createMessage("No upcoming matches are listed yet."));
        return;
      }

      grid.replaceChildren(...visibleMatches.map(createMatchCard));
    });
  } catch (error) {
    matchesGrids.forEach((grid) => {
      grid.replaceChildren(createMessage("Upcoming matches could not be loaded. Start the site with a local server and refresh this page."));
    });
  }
};

const newsGrids = document.querySelectorAll("[data-news-grid]");

const formatNewsDate = (dateValue) => {
  const date = new Date(`${dateValue}T00:00:00`);

  return new Intl.DateTimeFormat(currentLanguage === "fa" ? "fa-AF" : "en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
};

const createNewsCard = (item) => {
  const card = document.createElement("article");
  card.className = "card news-card";

  const image = document.createElement("img");
  image.src = item.image || "images/match-placeholder.svg";
  image.alt = localizedValue(item.title);
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const meta = document.createElement("div");
  meta.className = "meta news-meta";
  meta.append(createTag(localizedValue(item.category)), createTag(formatNewsDate(item.date)));

  const title = document.createElement("h3");
  title.textContent = localizedValue(item.title);

  const summary = document.createElement("p");
  summary.textContent = localizedValue(item.summary);

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = item.url || "#";
  link.textContent = t("Read update");

  body.append(meta, title, summary, link);
  card.append(image, body);
  return observeReveal(card);
};

const loadNews = async () => {
  if (!newsGrids.length) {
    return;
  }

  try {
    const response = await fetch("news.json");

    if (!response.ok) {
      throw new Error("Unable to load news.json");
    }

    const newsItems = await response.json();
    const sortedNews = newsItems.sort((first, second) => new Date(second.date) - new Date(first.date));

    newsGrids.forEach((grid) => {
      const limit = Number(grid.dataset.newsLimit) || sortedNews.length;
      const visibleNews = sortedNews.slice(0, limit);

      if (!visibleNews.length) {
        grid.replaceChildren(createMessage("No news updates are available yet."));
        return;
      }

      grid.replaceChildren(...visibleNews.map(createNewsCard));
    });
  } catch (error) {
    newsGrids.forEach((grid) => {
      grid.replaceChildren(createMessage("News updates could not be loaded. Start the site with a local server and refresh this page."));
    });
  }
};

const filterButtons = document.querySelectorAll("[data-filter]");
const galleryCards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    galleryCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.hidden = !matches;
    });
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = t("Thanks. Your message is ready for review.");
    contactForm.reset();
  });
}

observeStaticReveals();
setLanguage(currentLanguage);
