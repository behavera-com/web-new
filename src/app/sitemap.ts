import type { MetadataRoute } from "next";

const BASE_URL = "https://www.behavera.com";

const problemSlugs = [
  "fluktuace",
  "manazeri",
  "vykon-tymu",
  "chybne-nabory",
  "rust-firmy",
  "novy-ceo",
];

const roleSlugs = ["ceo", "hr", "manazer", "team-lead"];

const staticPages = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/diagnostika", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/jak-to-funguje", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/cenik", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/pripadovky", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/demo", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/o-nas", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/bezpecnost", priority: 0.5, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          cs: `${BASE_URL}${page.path}`,
          en: `${BASE_URL}/en${page.path}`,
        },
      },
    });
  }

  for (const slug of problemSlugs) {
    entries.push({
      url: `${BASE_URL}/problemy/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          cs: `${BASE_URL}/problemy/${slug}`,
          en: `${BASE_URL}/en/problemy/${slug}`,
        },
      },
    });
  }

  for (const slug of roleSlugs) {
    entries.push({
      url: `${BASE_URL}/pro/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          cs: `${BASE_URL}/pro/${slug}`,
          en: `${BASE_URL}/en/pro/${slug}`,
        },
      },
    });
  }

  return entries;
}
