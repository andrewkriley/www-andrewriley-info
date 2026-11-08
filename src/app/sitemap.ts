import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllPosts } from "@/lib/content";
export const dynamic="force-static";
export default function sitemap():MetadataRoute.Sitemap {const routes=["","/work","/about","/values","/journal","/beyond","/connect","/design-system","/uses"];return [...routes.map(route=>({url:`${site.url}${route}`,lastModified:new Date()})),...getAllPosts().map(post=>({url:`${site.url}/p/${post.slug}`,lastModified:new Date(post.date)}))]}
