import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://yt-forge.vercel.app/";

  return {
    rules: {
      userAgent: "*",
      allow: ["/"], 
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
