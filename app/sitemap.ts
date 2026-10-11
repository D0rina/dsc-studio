import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const pages = ["", "/usluge", "/cjenik", "/termini", "/o-meni", "/kontakt", "/privatnost"];
    return pages.map((p) => ({
        url: `${SITE_URL}${p}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: p === "" ? 1 : 0.7,
    }));
}