import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/content/site";
import { getNoteSlugs } from "@/lib/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticRoutes = [
    "",
    "/work",
    "/lab",
    "/research",
    "/research/intelligence-within-limits",
    "/practice",
    "/experience",
    "/notes",
    "/about",
    "/contact",
    "/resume",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: new Date(),
    })),
    ...getNoteSlugs().map((slug) => ({
      url: `${base}/notes/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
