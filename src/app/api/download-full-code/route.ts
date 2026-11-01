import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-static";

/**
 * Forces the browser to DOWNLOAD the full-code text file instead of
 * rendering 1.8MB of text inline (which freezes the preview panel).
 * Sets Content-Disposition: attachment so browsers save it as a file.
 */
export async function GET(_req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "public", "mozintelligence-full-code.txt");
    const data = await readFile(filePath);

    const res = new NextResponse(data, { status: 200 });
    res.headers.set("Content-Type", "text/plain; charset=utf-8");
    res.headers.set(
      "Content-Disposition",
      'attachment; filename="mozintelligence-full-code.txt"'
    );
    res.headers.set("Content-Length", String(data.length));
    res.headers.set("Cache-Control", "public, max-age=3600");
    return res;
  } catch (err) {
    return new NextResponse("File not found", { status: 404 });
  }
}
