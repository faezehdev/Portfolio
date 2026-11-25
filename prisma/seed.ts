import { prisma } from "@/lib/prisma";

const projectsData = [
  {
    title: "DotNama - Enterprise VOD Platform",
    titleFa: "دات‌نما — پلتفرم سازمانی پخش ویدیو (VOD)",
    description:
      "Architected an enterprise video streaming platform featuring dynamic catalog pre-rendering, watchlist caching, and custom video controls.",
    descriptionFa:
      "معماری پلتفرم سازمانی استریم ویدیو با پیش‌رندرینگ داینامیک کاتالوگ، کش کردن لیست تماشا و کنترل‌های اختصاصی پخش‌کننده.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Jest", "RTL"],
    imageUrl: "/images/projects/dotnama.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://dotnama.ir",
  },
  {
    title: "Falak TV - VOD & Media Streaming App",
    titleFa: "فلک تی‌وی — اپلیکیشن پخش محتوا و VOD",
    description:
      "Engineered a scalable VOD platform featuring dynamic route pre-rendering, responsive media queries, and optimized media delivery.",
    descriptionFa:
      "توسعه پلتفرم مقیاس‌پذیر پخش ویدیو با رندرینگ داینامیک مسیرها، چیدمان واکنش‌گرا و تحویل بهینه محتوای رسانه‌ای.",
    tags: ["Next.js", "TypeScript", "Responsive Architecture", "Web Performance"],
    imageUrl: "/images/projects/falaktv.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://falaktv.live",
  },
  {
    title: "Bocaveli - High-Fidelity Interactive Experience",
    titleFa: "بوکاولی — تجربه تعاملی با اسکرول افقی",
    description:
      "Engineered a continuous 60fps horizontal scrolling showcase utilizing GPU hardware transforms with zero cumulative layout shift.",
    descriptionFa:
      "پیاده‌سازی ویترین اسکرول افقی پیوسته ۶۰ فریم بر ثانیه با شتاب‌دهی سخت‌افزاری GPU و بدون پرش چیدمان (CLS).",
    tags: ["JavaScript", "GSAP ScrollTrigger", "GPU Acceleration"],
    imageUrl: "/images/projects/bocaveli.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://bocaveli.com",
  },
  {
    title: "MyDot - Web3 Social Platform",
    titleFa: "مای‌دات — شبکه اجتماعی Web3",
    description:
      "Developed modern front-end interfaces for a decentralized social network, integrating client-side wallet sessions and asynchronous state bindings.",
    descriptionFa:
      "طراحی و توسعه رابط کاربری مدرن برای شبکه اجتماعی غیرمتمرکز با اتصال کیف‌پول و مدیریت وضعیت ناهمگام.",
    tags: ["React.js", "TypeScript", "Web3 Integrations", "Responsive UI"],
    imageUrl: "/images/projects/mydot.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://mydot.one",
  },
 {
    title: "DotOne Holding",
    titleFa: "هلدینگ دات‌وان",
    description:
      "Engineered the primary enterprise holding portal focused on corporate identity, portfolio presentation, and technical SEO performance.",
    descriptionFa:
      "توسعه پورتال اصلی هلدینگ دات‌وان با تمرکز بر هویت سازمانی، معرفی مجموعه‌ها و سئوی فنی.",
    tags: ["React.js", "TypeScript", "SEO", "Enterprise UI"],
    imageUrl: "/images/projects/dotone.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://dotone.ir",
  },
  {
    title: "Dotone Gold",
    titleFa: "دات‌وان گلد",
    description:
      "Engineered a digital gold and commercial platform focused on high-conversion landing experiences and responsive UI.",
    descriptionFa:
      "توسعه پلتفرم تجاری و دیجیتال دات‌وان گلد با تمرکز بر صفحات فرود پربازده و رابط کاربری واکنش‌گرا.",
    tags: ["Next.js", "TypeScript", "SEO", "Commercial Platform"],
    imageUrl: "/images/projects/dotonegold.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://dotone.gold/",
  },
  {
    title: "Faraz Volta",
    titleFa: "فراز ولتا",
    description: "Electrical engineering corporate portal.",
    descriptionFa: "پورتال شرکتی مهندسی برق.",
    tags: ["JavaScript", "Css", "Corporate UI"],
    imageUrl: "/images/projects/faraz-volta.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://farazvolta.com",
  },
  {
    title: "Zeytoon Furniture",
    titleFa: "مبلمان زیتون",
    description: "E-commerce showroom & catalog platform.",
    descriptionFa: "پلتفرم نمایشگاه آنلاین و کاتالوگ فروشگاهی.",
    tags: ["JavaScript", "E-commerce", "Responsive"],
    imageUrl: "/images/projects/zeytoon.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://zeytoonfurniture.com",
  },
  {
    title: "Pajvak Rasam System",
    titleFa: "سامانه پاژواک رسام",
    description: "Corporate system interface.",
    descriptionFa: "رابط کاربری سامانه سازمانی.",
    tags: ["JavaScript", "Corporate Portal", "CSS"],
    imageUrl: "/images/projects/pajvak-rasam.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://prs-co.com",
  },
  {
    title: "Mohseni Group",
    titleFa: "گروه محسنی",
    description: "Mobile-optimized web experience.",
    descriptionFa: "تجربه وب بهینه‌شده برای موبایل.",
    tags: ["JavaScript", "Mobile-First", "Performance"],
    imageUrl: "/images/projects/mohseni-group.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://mohsenigroup.co",
  },
  {
    title: "Alijenab Furniture",
    titleFa: "مبلمان عالیجناب",
    description: "Showroom & manufacturing catalog.",
    descriptionFa: "کاتالوگ تولید و نمایشگاه آنلاین.",
    tags: ["JavaScript", "Showroom", "Catalog"],
    imageUrl: "/images/projects/alijenab.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://alijenabfurniture.com",
  },
  {
    title: "Ghiran Pakhsh (GPSI)",
    titleFa: "قیران پخش (GPSI)",
    description: "Industrial international export platform.",
    descriptionFa: "پلتفرم صادرات بین‌المللی و صنعتی.",
    tags: ["JavaScript", "Technical SEO", "Export Platform"],
    imageUrl: "/images/projects/ghiran-pakhsh.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://gpsibitumen.ir",
  },
  {
    title: "Dejan Group",
    titleFa: "گروه دژان",
    description: "Real estate and construction corporate website.",
    descriptionFa: "وب‌سایت شرکتی حوزه ساخت‌وساز و مستغلات.",
    tags: ["Real Estate", "Corporate UI", "Responsive Design"],
    imageUrl: "/images/projects/dejan-group.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "http://www.dejan-group.ir/",
  },
  {
    title: "Berkan Group",
    titleFa: "گروه برکان",
    description:
      "Structural engineering and innovative structural systems firm website featuring GSAP-powered horizontal scroll interactions.",
    descriptionFa:
      "وب‌سایت دفتر طراحی سازه و سیستم‌های سازه‌ای نوآورانه با تعامل اسکرول افقی مبتنی بر GSAP.",
    tags: ["GSAP", "Horizontal Scroll", "Structural Engineering", "Responsive UI"],
    imageUrl: "/images/projects/berkan-group.webp",
    githubUrl: "https://github.com/faezehdev",
    liveUrl: "https://berkangroup.ir/",
  },
];

async function main() {
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: projectsData,
  });
  console.log("Projects seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });