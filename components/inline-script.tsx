/**
 * Runs synchronously while the HTML is parsed (before first paint).
 * On the client the tag is inert, so React never tries to execute it again.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
