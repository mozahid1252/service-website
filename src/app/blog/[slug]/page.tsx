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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header — white, matches the reference light theme */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="MozIntelligence — E-Commerce Growth Intelligence"
              width={44}
              height={44}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-[#1F2937] leading-tight">MozIntelligence</div>
              <div className="text-[11px] text-[#9CA3AF] leading-tight">E-Commerce Growth Focused</div>
            </div>
          </a>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-[#6B7280] hover:text-[#7C3AED] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="sm:hidden">Blog</span>
          </Link>
        </div>
      </header>

      {/* Hero — deep purple gradient with bokeh glow */}
      <section className="relative overflow-hidden border-b border-[#E5E7EB]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#2D1B69] via-[#4A2C8A] to-[#5B21B6]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[#A78BFA] opacity-[0.25] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -left-20 h-64 w-64 rounded-full bg-[#818CF8] opacity-[0.18] blur-3xl"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Link href="/blog" className="transition-colors hover:text-white">
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
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
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
            <figure className="relative overflow-hidden rounded-[5px] border border-[#E5E7EB] shadow-[0_20px_48px_-20px_rgba(124,58,237,0.30)]">
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
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#7C3AED]/15 via-transparent to-transparent"
              />
            </figure>

            {/* Author row */}
            <div className="mt-8 flex items-center gap-3 border-b border-[#E5E7EB] pb-6">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7C3AED] text-base font-bold text-white"
              >
                M
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1F2937]">{post.author.name}</p>
                <p className="text-xs text-[#9CA3AF]">{post.author.role}</p>
              </div>
              <div className="ml-auto hidden items-center gap-3 text-xs font-medium text-[#9CA3AF] sm:flex">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[#7C3AED]" aria-hidden="true" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-[#7C3AED]" aria-hidden="true" />
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
                      className="mt-10 flex items-baseline gap-3 text-xl font-bold leading-snug text-[#1F2937] sm:text-2xl"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-6 shrink-0 translate-y-[-4px] bg-[#7C3AED]/70"
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
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4B5563]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]"
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
                      className="mt-9 overflow-hidden rounded-[5px] border border-[#E5E7EB] bg-[#F5F3FF] shadow-[0_16px_40px_-22px_rgba(31,31,31,0.15)]"
                    >
                      <Image
                        src={block.src}
                        alt={block.alt}
                        width={1280}
                        height={720}
                        className="h-auto w-full object-cover"
                      />
                      <figcaption className="flex items-start gap-2.5 border-t border-[#E5E7EB] px-5 py-3.5 text-[13px] leading-relaxed text-[#6B7280]">
                        <span
                          aria-hidden="true"
                          className="mt-[7px] inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]"
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
                      className="mt-10 rounded-[5px] border border-[#A855F7]/25 bg-[#F5F3FF] p-6 shadow-[0_10px_30px_-18px_rgba(124,58,237,0.30)] sm:p-7"
                    >
                      <p className="text-[15px] font-medium leading-relaxed text-[#1F2937]">
                        {block.text}
                      </p>
                      <a
                        href="https://calendar.app.google/TGnzfC65zBF3hVeD9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-[5px] bg-[#A855F7] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#7E22CE]"
                      >
                        Book a Free Discovery Call{" "}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </aside>
                  );
                }
                return (
                  <p key={i} className="mt-5 text-[15px] leading-[1.85] text-[#4B5563]">
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* Back to blog */}
            <div className="mt-12 border-t border-[#E5E7EB] pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] transition-colors hover:text-[#5B21B6]"
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
