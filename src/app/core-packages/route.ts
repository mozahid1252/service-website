import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  const htmlPath = path.join(process.cwd(), 'src', 'app', 'core-packages', 'landing.html');
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const headers = new Headers();
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'public, max-age=3600');
  return new Response(html, { headers });
}
