import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";

import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { SiteFooter } from "@/components/site/contact-footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | MozIntelligence Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#000000]">
      {/* Header — dark, matches the about-mozintelligence sub-page header */}
      <header className="sticky top-0 z-50 bg-[rgba(8,14,24,0.92)] backdrop-blur-xl border-b border-[rgba(0,198,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="MozIntelligence — E-Commerce Growth Intelligence"
              width={44}
              height={44}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105 img-premium"
              priority
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight">MozIntelligence</div>
              <div className="text-[11px] text-[#8899AA] leading-tight">E-Commerce Growth Focused</div>
            </div>
          </a>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-[#8899AA] hover:text-[#00C6FF] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="sm:hidden">Blog</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[rgba(0,198,255,0.08)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#0a1424] via-[#060b16] to-[#000000]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#00C6FF] opacity-[0.07] blur-3xl"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#8899AA]">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="transition-colors hover:text-[#00C6FF]">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Link href="/blog" className="transition-colors hover:text-[#00C6FF]">
                  Blog
                </Link>
                <span aria-hidden="true">/</span>
              </li>
              <li>
                <span aria-current="page" className="text-white line-clamp-1">
                  {post.category}
                </span>
              </li>
            </ol>
          </nav>
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-[rgba(0,198,255,0.3)] bg-[rgba(0,198,255,0.08)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#00C6FF]">
            {post.category} · {post.date} · {post.readTime}
          </span>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[44px]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <main className="flex-1 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="mx-auto flex max-w-3xl flex-col">
            {/* Cover image */}
            <figure className="relative overflow-hidden rounded-2xl border border-[rgba(0,198,255,0.12)] shadow-[0_20px_48px_-20px_rgba(0,198,255,0.35)]">
              <Image
                src={post.coverImage}
                alt={post.coverAlt}
                width={1344}
                height={768}
                priority
                className="h-auto w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00C6FF]/15 via-transparent to-transparent"
              />
            </figure>

            {/* Author row */}
            <div className="mt-8 flex items-center gap-3 border-b border-[rgba(0,198,255,0.12)] pb-6">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00C6FF] text-base font-bold text-[#000000]"
              >
                M
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{post.author.name}</p>
                <p className="text-xs text-[#8899AA]">{post.author.role}</p>
              </div>
              <div className="ml-auto hidden items-center gap-3 text-xs font-medium text-[#8899AA] sm:flex">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[#00C6FF]" aria-hidden="true" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-[#00C6FF]" aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Body blocks */}
            <div className="mt-8 flex flex-col">
              {post.content.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={i}
                      className="mt-10 flex items-baseline gap-3 text-xl font-bold leading-snug text-white sm:text-2xl"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-6 shrink-0 translate-y-[-4px] bg-[#00C6FF]/70"
                      />
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="mt-5 flex flex-col gap-2.5">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-[#B8C5D3]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C6FF]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "image") {
                  return (
                    <figure
                      key={i}
                      className="mt-9 overflow-hidden rounded-2xl border border-[rgba(0,198,255,0.12)] bg-[rgba(13,21,32,0.5)] shadow-[0_16px_40px_-22px_rgba(0,0,0,0.7)]"
                    >
                      <Image
                        src={block.src}
                        alt={block.alt}
                        width={1280}
                        height={720}
                        className="h-auto w-full object-cover"
                      />
                      <figcaption className="flex items-start gap-2.5 border-t border-[rgba(0,198,255,0.12)] px-5 py-3.5 text-[13px] leading-relaxed text-[#8899AA]">
                        <span
                          aria-hidden="true"
                          className="mt-[7px] inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C6FF]"
                        />
                        {block.caption}
                      </figcaption>
                    </figure>
                  );
                }
                if (block.type === "callout") {
                  return (
                    <aside
                      key={i}
                      className="mt-10 rounded-2xl border border-[rgba(0,198,255,0.25)] bg-[rgba(0,198,255,0.06)] p-6 shadow-[0_10px_30px_-18px_rgba(0,198,255,0.4)] sm:p-7"
                    >
                      <p className="text-[15px] font-medium leading-relaxed text-white">
                        {block.text}
                      </p>
                      <a
                        href="https://calendar.app.google/TGnzfC65zBF3hVeD9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-md bg-[#00C6FF] px-6 py-3 text-sm font-semibold text-[#000000] transition-colors duration-300 hover:bg-[#33d4ff]"
                      >
                        Book a Free Discovery Call{" "}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </aside>
                  );
                }
                return (
                  <p key={i} className="mt-5 text-[15px] leading-[1.85] text-[#B8C5D3]">
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* Back to blog */}
            <div className="mt-12 border-t border-[rgba(0,198,255,0.12)] pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00C6FF] transition-colors hover:text-[#33d4ff]"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                Back to all articles
              </Link>
            </div>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
