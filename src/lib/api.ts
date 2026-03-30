import type { BlogPost, Category } from "./types";

const BE_URL = import.meta.env.BE_URL ?? "";

export async function fetchPosts(params?: {
    category?: string;
    tag?: string;
}): Promise<BlogPost[]> {
    const url = new URL(`${BE_URL}/posts`);
    if (params?.category) url.searchParams.set("category", params.category);
    if (params?.tag) url.searchParams.set("tag", params.tag);

    const res = await fetch(url.toString());
    if (!res.ok) return [];
    return res.json();
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
    const res = await fetch(`${BE_URL}/posts/${slug}`);
    if (!res.ok) return null;
    return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
    const res = await fetch(`${BE_URL}/categories`);
    if (!res.ok) return [];
    return res.json();
}
