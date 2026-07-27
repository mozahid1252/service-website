"use client";

import { useEffect } from "react";

type Props = {
  bodyHtml: string;
  scriptCode: string;
};

export default function LandingContent({ bodyHtml, scriptCode }: Props) {
  useEffect(() => {
    // Execute the landing page's inline script in the global scope so it
    // can query the DOM (IntersectionObserver for .reveal elements, sticky
    // nav, mobile menu, smooth scroll). React does not execute <script>
    // tags injected via dangerouslySetInnerHTML, so we run it manually
    // after the DOM has mounted.
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(scriptCode);
      fn();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Landing page script error:", e);
    }
  }, [scriptCode]);

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
