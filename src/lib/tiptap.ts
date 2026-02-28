// ---------------------------------------------------------------------------
// TipTap / ProseMirror document types
// ---------------------------------------------------------------------------

export interface TipTapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  marks?: TipTapMark[];
  text?: string;
}

export interface TipTapDoc {
  type: "doc";
  content: TipTapNode[];
}

// ---------------------------------------------------------------------------
// Plain-text extraction (used for reading-time estimation)
// ---------------------------------------------------------------------------

export function extractPlainText(node: TipTapNode | TipTapDoc): string {
  if (node.type === "text") return (node as TipTapNode).text ?? "";
  if (!node.content?.length) return "";
  return node.content.map(extractPlainText).join(" ");
}

// ---------------------------------------------------------------------------
// HTML renderer — semantic output compatible with Tailwind prose classes
// ---------------------------------------------------------------------------

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function applyMarks(text: string, marks?: TipTapMark[]): string {
  const escaped = esc(text);
  if (!marks?.length) return escaped;

  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return `<strong>${acc}</strong>`;
      case "italic":
        return `<em>${acc}</em>`;
      case "underline":
        return `<u>${acc}</u>`;
      case "strike":
        return `<s>${acc}</s>`;
      case "code":
        return `<code>${acc}</code>`;
      case "link": {
        const href = esc(String(mark.attrs?.href ?? "#"));
        const target = mark.attrs?.target
          ? ` target="${esc(String(mark.attrs.target))}"`
          : ` target="_blank" rel="noopener noreferrer"`;
        return `<a href="${href}"${target}>${acc}</a>`;
      }
      case "highlight": {
        const color = mark.attrs?.color
          ? ` style="background-color:${esc(String(mark.attrs.color))}"`
          : "";
        return `<mark${color}>${acc}</mark>`;
      }
      case "textStyle": {
        const styles: string[] = [];
        if (mark.attrs?.color) styles.push(`color:${esc(String(mark.attrs.color))}`);
        if (mark.attrs?.fontFamily)
          styles.push(`font-family:${esc(String(mark.attrs.fontFamily))}`);
        return styles.length
          ? `<span style="${styles.join(";")}">${acc}</span>`
          : acc;
      }
      default:
        return acc;
    }
  }, escaped);
}

function renderChildren(node: TipTapNode): string {
  return (node.content ?? []).map(renderNode).join("");
}

function renderNode(node: TipTapNode): string {
  switch (node.type) {
    case "paragraph":
      // empty paragraph = blank line spacer
      return `<p>${renderChildren(node) || "\u200B"}</p>`;

    case "heading": {
      const level = Math.min(Math.max(Number(node.attrs?.level ?? 2), 1), 6);
      return `<h${level}>${renderChildren(node)}</h${level}>`;
    }

    case "text":
      return applyMarks(node.text ?? "", node.marks);

    case "bulletList":
      return `<ul>${renderChildren(node)}</ul>`;

    case "orderedList": {
      const start = node.attrs?.start ? ` start="${Number(node.attrs.start)}"` : "";
      return `<ol${start}>${renderChildren(node)}</ol>`;
    }

    case "listItem":
      return `<li>${renderChildren(node)}</li>`;

    case "taskList":
      return `<ul class="task-list">${renderChildren(node)}</ul>`;

    case "taskItem": {
      const checked = node.attrs?.checked ? " checked" : "";
      return `<li class="task-item"><input type="checkbox" disabled${checked} />${renderChildren(node)}</li>`;
    }

    case "blockquote":
      return `<blockquote>${renderChildren(node)}</blockquote>`;

    case "codeBlock": {
      const lang = esc(String(node.attrs?.language ?? ""));
      const cls = lang ? ` class="language-${lang}"` : "";
      return `<pre><code${cls}>${renderChildren(node)}</code></pre>`;
    }

    case "image": {
      const src = esc(String(node.attrs?.src ?? ""));
      const alt = esc(String(node.attrs?.alt ?? ""));
      const title = node.attrs?.title
        ? ` title="${esc(String(node.attrs.title))}"`
        : "";
      return src
        ? `<img src="${src}" alt="${alt}"${title} loading="lazy" />`
        : "";
    }

    case "horizontalRule":
      return "<hr />";

    case "hardBreak":
      return "<br />";

    case "table":
      return `<table>${renderChildren(node)}</table>`;
    case "tableRow":
      return `<tr>${renderChildren(node)}</tr>`;
    case "tableHeader":
      return `<th>${renderChildren(node)}</th>`;
    case "tableCell":
      return `<td>${renderChildren(node)}</td>`;

    default:
      // unknown node — render children so content is never silently dropped
      return renderChildren(node);
  }
}

/** Converts a TipTap JSON document into an HTML string. */
export function renderToHtml(doc: TipTapDoc): string {
  return (doc?.content ?? []).map(renderNode).join("\n");
}
