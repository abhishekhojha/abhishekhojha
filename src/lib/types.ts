import type { TipTapDoc } from "./tiptap";

export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  content: TipTapDoc;
  coverImage?: string;
  category: string;
  extraCategories: string[];
  tags: string[];
  draft: boolean;
  readingTime?: string;
  pubDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id?: string;
  slug: string;
  name: string;
  description?: string;
  createdAt: Date;
}
