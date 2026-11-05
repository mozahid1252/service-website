"use client";

import { useEffect } from "react";

type Props = {
  bodyHtml: string;
  scriptCode: string;
};

export default function LandingContent({ bodyHtml, scriptCode }: Props) {
  useEffect(() => {
    try {
      const fn = new Function(scriptCode);
      fn();
    } catch (e) {
      console.error("Landing page script error:", e);
    }
  }, [scriptCode]);

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
