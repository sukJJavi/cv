import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.help-estudio.es/cv/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          es: "https://www.help-estudio.es/cv/",
          en: "https://www.help-estudio.es/cv/",
        },
      },
    },
  ];
}
