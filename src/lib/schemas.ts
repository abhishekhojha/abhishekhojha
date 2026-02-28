import { z } from "zod";

// ---------------------------------------------------------------------------
// TipTap document schema (recursive via z.lazy)
// ---------------------------------------------------------------------------

const TipTapMarkSchema = z.object({
  type: z.string(),
  attrs: z.record(z.unknown()).optional(),
});

type TipTapNodeInput = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNodeInput[];
  marks?: z.infer<typeof TipTapMarkSchema>[];
  text?: string;
};

const TipTapNodeSchema: z.ZodType<TipTapNodeInput> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.unknown()).optional(),
    content: z.array(TipTapNodeSchema).optional(),
    marks: z.array(TipTapMarkSchema).optional(),
    text: z.string().optional(),
  })
);

export const TipTapDocSchema = z.object({
  type: z.literal("doc"),
  content: z.array(TipTapNodeSchema).min(1, "content cannot be empty"),
});

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

const slugField = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must be lowercase alphanumeric with hyphens only (e.g. my-post)",
  })
  .optional();

const urlField = z
  .string()
  .url({ message: "Must be a valid URL" })
  .optional();

const isoDateField = z
  .string()
  .datetime({
    message:
      "Must be a valid ISO 8601 date-time string (e.g. 2026-02-28T10:00:00.000Z)",
  })
  .optional();

// ---------------------------------------------------------------------------
// POST /api/posts — create
// ---------------------------------------------------------------------------
export const CreatePostSchema = z.object({
  title:       z.string().trim().min(1, "title is required").max(200),
  description: z.string().trim().min(1, "description is required").max(500),
  content:     TipTapDocSchema,
  category:    z.string().trim().min(1, "category is required"),
  slug:            slugField,
  coverImage:      urlField,
  extraCategories: z.array(z.string().trim().min(1)).optional().default([]),
  tags:            z.array(z.string().trim().min(1)).optional().default([]),
  draft:           z.boolean().optional().default(false),
  readingTime:     z.string().optional(),
  pubDate:         isoDateField,
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

// ---------------------------------------------------------------------------
// PUT /api/posts/:slug — partial update (all fields optional)
// ---------------------------------------------------------------------------
export const UpdatePostSchema = z
  .object({
    title:           z.string().trim().min(1).max(200),
    description:     z.string().trim().min(1).max(500),
    content:         TipTapDocSchema,
    category:        z.string().trim().min(1),
    slug: z
      .string()
      .trim()
      .min(1)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "Slug must be lowercase alphanumeric with hyphens only",
      }),
    coverImage:      z.string().url({ message: "Must be a valid URL" }).or(z.literal("")),
    extraCategories: z.array(z.string().trim().min(1)),
    tags:            z.array(z.string().trim().min(1)),
    draft:           z.boolean(),
    readingTime:     z.string(),
    pubDate:         z.string().datetime({
      message: "Must be a valid ISO 8601 date-time string",
    }),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Request body must include at least one field to update",
  });

export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;

// ---------------------------------------------------------------------------
// GET /api/posts — query params
// ---------------------------------------------------------------------------
export const GetPostsQuerySchema = z.object({
  category: z.string().trim().min(1).optional(),
  tag:      z.string().trim().min(1).optional(),
  limit: z
    .string()
    .optional()
    .transform((val) =>
      val ? Math.min(Math.max(parseInt(val, 10), 1), 100) : 50
    )
    .pipe(z.number().int().min(1).max(100)),
  draft: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

export type GetPostsQuery = z.infer<typeof GetPostsQuerySchema>;

// ---------------------------------------------------------------------------
// POST /api/categories — create
// ---------------------------------------------------------------------------
export const CreateCategorySchema = z.object({
  name:        z.string().trim().min(1, "name is required").max(100),
  slug:        slugField,
  description: z.string().trim().max(300).optional(),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

// ---------------------------------------------------------------------------
// Helper — format Zod errors into a human-readable string
// ---------------------------------------------------------------------------
export function formatZodError(error: z.ZodError): string {
  return error.errors
    .map((e) => {
      const path = e.path.length > 0 ? `${e.path.join(".")}: ` : "";
      return `${path}${e.message}`;
    })
    .join("; ");
}
