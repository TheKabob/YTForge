export default async function sitemap() {
  const baseUrl = "https://yt-forge.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];
}
