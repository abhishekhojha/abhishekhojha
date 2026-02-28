import { MongoClient, ObjectId } from "mongodb";
import type { Db, Collection } from "mongodb";
import { extractPlainText, type TipTapDoc } from "./tiptap";

export type { TipTapDoc };

export interface BlogPost {
  _id?: ObjectId;
  slug: string;
  title: string;
  description: string;
  content: TipTapDoc; // TipTap/ProseMirror JSON document
  coverImage?: string; // Cloudinary URL
  category: string; // primary category slug
  extraCategories: string[]; // additional category slugs
  tags: string[];
  draft: boolean;
  readingTime?: string;
  pubDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id?: ObjectId;
  slug: string;
  name: string;
  description?: string;
  createdAt: Date;
}

// ---------------------------------------------------------------------------
// Singleton client — reused across requests in the same Worker instance
// ---------------------------------------------------------------------------
declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined;
}

function getClient(uri: string): MongoClient {
  if (!globalThis.__mongoClient) {
    globalThis.__mongoClient = new MongoClient(uri);
  }
  return globalThis.__mongoClient;
}

function getDb(uri: string): Db {
  return getClient(uri).db();
}

export function getPostsCollection(uri: string): Collection<BlogPost> {
  return getDb(uri).collection<BlogPost>("posts");
}

export function getCategoriesCollection(uri: string): Collection<Category> {
  return getDb(uri).collection<Category>("categories");
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Converts a title string to a URL-safe slug. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Estimates reading time from a TipTap document. */
export function estimateReadingTime(content: TipTapDoc): string {
  const text = extractPlainText(content);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
