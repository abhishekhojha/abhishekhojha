# Blog API Documentation

Base URL (local dev): `http://localhost:4321`  
Base URL (production): `https://abhishekhojha.com`

## Authentication

Protected endpoints require this header:

| Header | Value |
|--------|-------|
| `x-api-key` | Your `API_SECRET` value from `.env` |

All request bodies must use `Content-Type: application/json`.

---

## Content Format — TipTap JSON

The `content` field stores a **TipTap/ProseMirror JSON document** — the same format output by [Novel](https://novel.sh/) and [TipTap](https://tiptap.dev/) editors.

Minimum valid structure:
```json
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "Hello world" }]
    }
  ]
}
```

### Supported node types

| Node | Example attrs |
|------|---------------|
| `paragraph` | — |
| `heading` | `{ "level": 2 }` (1–6) |
| `bulletList` | — |
| `orderedList` | `{ "start": 1 }` |
| `listItem` | — |
| `taskList` | — |
| `taskItem` | `{ "checked": false }` |
| `blockquote` | — |
| `codeBlock` | `{ "language": "typescript" }` |
| `image` | `{ "src": "...", "alt": "...", "title": "..." }` |
| `horizontalRule` | — |
| `hardBreak` | — |
| `table` / `tableRow` / `tableHeader` / `tableCell` | — |

### Supported marks (inline formatting)

| Mark | Example attrs |
|------|---------------|
| `bold` | — |
| `italic` | — |
| `underline` | — |
| `strike` | — |
| `code` | — |
| `link` | `{ "href": "https://...", "target": "_blank" }` |
| `highlight` | `{ "color": "#fef08a" }` |
| `textStyle` | `{ "color": "#6366f1", "fontFamily": "mono" }` |

### Full example body for POST /api/posts

```json
{
  "title": "Getting Started with Astro",
  "description": "A beginner's guide to building fast sites with Astro.",
  "coverImage": "https://res.cloudinary.com/demo/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/cover.jpg",
  "category": "web-development",
  "extraCategories": ["tutorials"],
  "tags": ["astro", "javascript"],
  "draft": false,
  "pubDate": "2026-02-28T10:00:00.000Z",
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": { "level": 2 },
        "content": [{ "type": "text", "text": "What is Astro?" }]
      },
      {
        "type": "paragraph",
        "content": [
          { "type": "text", "text": "Astro is a " },
          { "type": "text", "text": "modern", "marks": [{ "type": "bold" }] },
          { "type": "text", "text": " static site builder with islands architecture." }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
          "alt": "Astro architecture diagram"
        }
      },
      {
        "type": "codeBlock",
        "attrs": { "language": "bash" },
        "content": [{ "type": "text", "text": "npm create astro@latest" }]
      }
    ]
  }
}
```

> **Tip:** If you use Novel or TipTap in a future admin panel, the editor outputs exactly this structure. Just `POST` it directly.

---

## Categories

### GET /api/categories
List all categories. No auth required.

**Request**
```
GET /api/categories
```

**Response 200**
```json
[
  {
    "_id": "664abc123...",
    "slug": "web-development",
    "name": "Web Development",
    "description": "Articles about the web",
    "createdAt": "2026-02-28T10:00:00.000Z"
  }
]
```

---

### POST /api/categories
Create a new category. Auth required.

**Request**
```
POST /api/categories
x-api-key: <API_SECRET>
Content-Type: application/json
```

**Body**
```json
{
  "name": "Web Development",
  "description": "Articles about building for the web",
  "slug": "web-development"
}
```

> `slug` is optional — auto-generated from `name` if omitted.  
> `description` is optional.

**Response 201**
```json
{
  "success": true,
  "id": "664abc123...",
  "slug": "web-development"
}
```

**Error responses**

| Status | Reason |
|--------|--------|
| 400 | `name` is missing |
| 401 | Wrong or missing `x-api-key` |
| 409 | Slug already exists |
| 422 | Validation failed — body contains `errors` string with field details |

---

## Posts

### GET /api/posts
List posts. No auth required (returns only published posts by default).

**Request**
```
GET /api/posts
```

**Query Parameters**

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category slug (matches primary or extra categories) |
| `tag` | string | Filter by tag name |
| `limit` | number | Max results, default `50`, max `100` |
| `draft` | `true` | Include draft posts — requires valid `x-api-key` header |

**Examples**
```
GET /api/posts?category=web-development
GET /api/posts?tag=astro&limit=10
GET /api/posts?draft=true  (+ x-api-key header)
```

**Response 200** — `content` field is excluded from list responses.
```json
[
  {
    "_id": "664abc123...",
    "slug": "hello-world",
    "title": "Hello World",
    "description": "My first post",
    "coverImage": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "category": "web-development",
    "extraCategories": ["open-source"],
    "tags": ["astro", "javascript"],
    "draft": false,
    "readingTime": "3 min read",
    "pubDate": "2026-02-28T10:00:00.000Z",
    "createdAt": "2026-02-28T10:00:00.000Z",
    "updatedAt": "2026-02-28T10:00:00.000Z"
  }
]
```

---

### GET /api/posts/:slug
Get a single post with full TipTap JSON content.

**Request**
```
GET /api/posts/hello-world
```

**Response 200**
```json
{
  "_id": "664abc123...",
  "slug": "hello-world",
  "title": "Hello World",
  "description": "My first post",
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [{ "type": "text", "text": "Hello world" }]
      }
    ]
  },
  "coverImage": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  "category": "web-development",
  "extraCategories": [],
  "tags": ["astro"],
  "draft": false,
  "readingTime": "3 min read",
  "pubDate": "2026-02-28T10:00:00.000Z",
  "createdAt": "2026-02-28T10:00:00.000Z",
  "updatedAt": "2026-02-28T10:00:00.000Z"
}
```

**Error responses**

| Status | Reason |
|--------|--------|
| 404 | Post not found |

---

### POST /api/posts
Create a new post. Auth required. See the **Content Format** section at the top for full `content` examples.

**Request**
```
POST /api/posts
x-api-key: <API_SECRET>
Content-Type: application/json
```

**Body**
```json
{
  "title": "Getting Started with Astro",
  "description": "A beginner's guide to building fast sites with Astro.",
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [{ "type": "text", "text": "Your post body here..." }]
      }
    ]
  },
  "coverImage": "https://res.cloudinary.com/demo/image/upload/cover.jpg",
  "category": "web-development",
  "extraCategories": ["open-source", "tutorials"],
  "tags": ["astro", "javascript", "static-sites"],
  "draft": false,
  "pubDate": "2026-02-28T10:00:00.000Z",
  "slug": "getting-started-with-astro"
}
```

**Required fields:** `title`, `description`, `content` (TipTap JSON doc), `category`

**Optional fields**

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| `slug` | string | auto from `title` | kebab-case, e.g. `my-post` |
| `coverImage` | string (URL) | — | Cloudinary URL |
| `extraCategories` | string[] | `[]` | Additional category slugs |
| `tags` | string[] | `[]` | Free-form tags |
| `draft` | boolean | `false` | Set `true` to hide from public |
| `readingTime` | string | auto-calculated | e.g. `"5 min read"` |
| `pubDate` | ISO date string | now | e.g. `"2026-02-28T10:00:00.000Z"` |

**Response 201**
```json
{
  "success": true,
  "id": "664abc123...",
  "slug": "getting-started-with-astro"
}
```

**Error responses**

| Status | Reason |
|--------|--------|
| 400 | Malformed JSON |
| 401 | Wrong or missing `x-api-key` |
| 409 | Slug already exists |
| 422 | Validation failed — response body: `{ "errors": "field: message; ..." }` |

---

### PUT /api/posts/:slug
Update an existing post. Auth required. Only send the fields you want to change.

**Request**
```
PUT /api/posts/getting-started-with-astro
x-api-key: <API_SECRET>
Content-Type: application/json
```

**Body** — all fields optional, include only what changes:
```json
{
  "title": "Getting Started with Astro 5",
  "draft": false,
  "tags": ["astro", "javascript", "astro-5"]
}
```

To update content, pass a full TipTap doc:
```json
{
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [{ "type": "text", "text": "Updated body..." }]
      }
    ]
  }
}
```

**Updatable fields:** `title`, `description`, `content`, `coverImage`, `category`, `extraCategories`, `tags`, `draft`, `readingTime`, `pubDate`, `slug`

> `readingTime` is automatically recalculated when you update `content` (unless you also explicitly send `readingTime`).

**Response 200**
```json
{
  "success": true
}
```

**Error responses**

| Status | Reason |
|--------|--------|
| 400 | Malformed JSON or empty body |
| 401 | Wrong or missing `x-api-key` |
| 404 | Post not found |
| 422 | Validation failed — response body: `{ "errors": "field: message; ..." }` |

---

### DELETE /api/posts/:slug
Permanently delete a post. Auth required.

**Request**
```
DELETE /api/posts/getting-started-with-astro
x-api-key: <API_SECRET>
```

**Response 200**
```json
{
  "success": true,
  "deleted": "getting-started-with-astro"
}
```

**Error responses**

| Status | Reason |
|--------|--------|
| 401 | Wrong or missing `x-api-key` |
| 404 | Post not found |

---

## Postman Quick Setup

1. Create a new **Collection** called `Portfolio Blog API`
2. Set a **Collection Variable**:
   - `baseUrl` → `http://localhost:4321`
   - `apiKey` → your `API_SECRET` from `.env`
3. For protected requests, add header: `x-api-key: {{apiKey}}`

### Recommended request order for first-time setup

1. `POST /api/categories` — create your categories first
2. `POST /api/posts` — create posts referencing those category slugs
3. `GET /api/posts` — verify your posts appear

---

## Cloudinary Image Tips

Upload images to Cloudinary and paste the delivery URL into `coverImage` or inside an `image` node within `content`.

**Cover image** — top-level field:
```json
"coverImage": "https://res.cloudinary.com/<cloud_name>/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/cover.jpg"
```

**Inline image inside content** — use an `image` node:
```json
{
  "type": "image",
  "attrs": {
    "src": "https://res.cloudinary.com/<cloud_name>/image/upload/q_auto,f_auto/inline.jpg",
    "alt": "Description of the image"
  }
}
```

**Recommended Cloudinary transformations** (insert between `/upload/` and the filename):

| Use case | Transformation |
|----------|----------------|
| Cover image | `w_1200,h_630,c_fill,q_auto,f_auto` |
| Inline image | `w_800,q_auto,f_auto` |
| Thumbnail | `w_400,h_300,c_fill,q_auto,f_auto` |

Full example:
```
https://res.cloudinary.com/demo/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/my-cover.jpg
```
