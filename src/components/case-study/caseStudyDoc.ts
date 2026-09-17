/**
 * Helpers for reading a case-study document.
 *
 * These live apart from the renderer so that file exports a component and
 * nothing else — Fast Refresh needs that, and the parsing is pure anyway.
 */

/** Stable, readable anchor for a heading, so the rail can link to it. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

/** Plain text of a React child tree — headings can contain inline markup. */
export function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: React.ReactNode } }).props.children)
  }
  return ""
}

/**
 * The `##` headings, in document order — the dialog's section rail.
 * Derived from the document itself, so a new section in `docs/` appears in
 * the rail with no code change.
 */
export function caseStudySections(markdown: string) {
  const out: { id: string; label: string }[] = []
  for (const line of markdown.split("\n")) {
    const m = /^##\s+(.*\S)\s*$/.exec(line)
    if (!m) continue
    const label = m[1].replace(/\s*#+\s*$/, "")
    out.push({ id: slugify(label), label })
  }
  return out
}
