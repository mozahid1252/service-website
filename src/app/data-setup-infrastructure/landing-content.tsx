"use client";

import { useEffect } from "react";

type Props = {
  bodyHtml: string;
  scriptCode: string;
};

export default function LandingContent({ bodyHtml, scriptCode }: Props) {
  useEffect(() => {
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
