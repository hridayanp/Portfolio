import { memo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { slugify, textOf } from "./caseStudyDoc"

/**
 * Renders a case-study document.
 *
 * The documents in `docs/` are hand-authored and vetted, so this component
 * only ever styles them — it never rewrites, reorders, truncates or
 * summarises. Every node maps 1:1 to the markdown it came from.
 */

export const CaseStudyMarkdown = memo(function CaseStudyMarkdown({
  markdown,
}: {
  markdown: string
}) {
  return (
    <div className="case-study-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* The document's own H1 is shown in the dialog header, so it is
             demoted here rather than repeated at display size. */
          h1: ({ children }) => (
            <h2 className="text-h3 mt-0 mb-6 font-extrabold tracking-tight text-[var(--ds-text-primary)]">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3
              id={slugify(textOf(children))}
              className="text-h3 mt-12 mb-4 scroll-mt-6 border-t border-[var(--ds-border)] pt-8 font-bold tracking-tight text-[var(--ds-text-primary)] first:mt-0 first:border-0 first:pt-0"
            >
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-body mt-8 mb-3 font-bold tracking-tight text-[var(--ds-text-primary)]">
              {children}
            </h4>
          ),
          h4: ({ children }) => (
            <h5 className="text-body-s mt-6 mb-2 font-bold text-[var(--ds-text-body)]">
              {children}
            </h5>
          ),
          p: ({ children }) => (
            <p className="text-body-s my-4 leading-relaxed text-[var(--ds-text-secondary)]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="text-body-s my-4 list-disc space-y-2 ps-5 text-[var(--ds-text-secondary)]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="text-body-s my-4 list-decimal space-y-2 ps-5 text-[var(--ds-text-secondary)]">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-[var(--ds-text-primary)]">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ds-link)] underline-offset-4 hover:underline"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-10 border-[var(--ds-border)]" />,
          blockquote: ({ children }) => (
            <blockquote className="my-5 border-s-2 border-[var(--ds-accent)] bg-[var(--ds-accent-subtle)] py-2 ps-4 text-[var(--ds-text-secondary)]">
              {children}
            </blockquote>
          ),
          /* Tables scroll horizontally instead of forcing the dialog wide —
             several of these documents carry six-column data inventories. */
          table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto rounded-xl border border-[var(--ds-border)]">
              <table className="w-full border-collapse text-left">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[var(--ds-surface-2)]">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-label border-b border-[var(--ds-border)] px-3 py-2.5 align-top font-semibold tracking-normal whitespace-nowrap text-[var(--ds-text-primary)] normal-case">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="text-body-s border-b border-[var(--ds-border-subtle)] px-3 py-2.5 align-top text-[var(--ds-text-secondary)]">
              {children}
            </td>
          ),
          /* Many fenced blocks are ASCII architecture diagrams, so the pre
             keeps its exact whitespace and scrolls rather than wrapping. */
          pre: ({ children }) => (
            <pre className="font-mono my-5 overflow-x-auto rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-sunken)] p-4 text-[12px] leading-[1.5] text-[var(--ds-text-body)]">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const fenced = /language-/.test(className ?? "")
            if (fenced) return <code className={className}>{children}</code>
            return (
              <code className="font-mono rounded-md border border-[var(--ds-accent-border)] bg-[var(--ds-accent-subtle)] px-1.5 py-0.5 text-[0.85em] text-[var(--ds-accent)]">
                {children}
              </code>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
})
