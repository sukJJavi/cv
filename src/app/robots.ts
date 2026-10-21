import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.help-estudio.es/cv/sitemap.xml",
    host: "https://www.help-estudio.es",
  };
}
