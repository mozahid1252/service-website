import Image from "next/image";

import { FadeIn } from "./reveal";

/* ================================================================
   E-commerce Platforms We Support
   ================================================================ */

type Platform = { name: string; icon: string };

/* Row 1 — Global & widely used platforms (first half) */
const globalRowOne: Platform[] = [
  { name: "Shopify", icon: "/platform-icons/shopify.png" },
  { name: "Shopify Plus", icon: "/platform-icons/shopify-plus.png" },
  { name: "WooCommerce", icon: "/platform-icons/woocommerce.png" },
  { name: "BigCommerce", icon: "/platform-icons/bigcommerce.png" },
  { name: "Adobe Commerce", icon: "/platform-icons/adobe-commerce.png" },
  { name: "Wix eCommerce", icon: "/platform-icons/wix.png" },
  { name: "Squarespace Commerce", icon: "/platform-icons/squarespace.png" },
  { name: "PrestaShop", icon: "/platform-icons/prestashop.png" },
  { name: "OpenCart", icon: "/platform-icons/opencart.png" },
  { name: "Ecwid", icon: "/platform-icons/ecwid.png" },
];

/* Row 2 — Global & widely used platforms (second half) */
const globalRowTwo: Platform[] = [
  { name: "Square Online", icon: "/platform-icons/square-online.png" },
  { name: "Shift4Shop", icon: "/platform-icons/shift4shop.png" },
  { name: "Webflow Ecommerce", icon: "/platform-icons/webflow.png" },
  { name: "Big Cartel", icon: "/platform-icons/bigcartel.png" },
  { name: "Volusion", icon: "/platform-icons/volusion.png" },
  { name: "VTEX", icon: "/platform-icons/vtex.png" },
  { name: "commercetools", icon: "/platform-icons/commercetools.png" },
  { name: "Salesforce Commerce Cloud", icon: "/platform-icons/salesforce.png" },
  { name: "SAP Commerce Cloud", icon: "/platform-icons/sap.png" },
  { name: "Shopline", icon: "/platform-icons/shopline.png" },
];

/* Row 3 — Europe-focused platforms */
const europePlatforms: Platform[] = [
  { name: "Shopware", icon: "/platform-icons/shopware.png" },
  { name: "JTL-Shop", icon: "/platform-icons/jtl-shop.png" },
  { name: "Gambio", icon: "/platform-icons/gambio.png" },
  { name: "ePages", icon: "/platform-icons/epages.png" },
  { name: "OXID eSales", icon: "/platform-icons/oxid-esales.png" },
  { name: "Lightspeed eCom", icon: "/platform-icons/lightspeed.png" },
  { name: "CCV Shop", icon: "/platform-icons/ccv-shop.png" },
  { name: "Mijnwebwinkel", icon: "/platform-icons/mijnwebwinkel.png" },
  { name: "Quickbutik", icon: "/platform-icons/quickbutik.png" },
  { name: "Mystore", icon: "/platform-icons/mystore.png" },
];

/* Row 4 — Asia & GCC-focused platforms */
const asiaGccPlatforms: Platform[] = [
  { name: "EasyStore", icon: "/platform-icons/easystore.png" },
  { name: "SiteGiant", icon: "/platform-icons/sitegiant.png" },
  { name: "Cafe24", icon: "/platform-icons/cafe24.png" },
  { name: "Makeshop", icon: "/platform-icons/makeshop.png" },
  { name: "Salla", icon: "/platform-icons/salla.png" },
  { name: "Zid", icon: "/platform-icons/zid.png" },
  { name: "ExpandCart", icon: "/platform-icons/expandcart.png" },
  { name: "Shoplazza", icon: "/platform-icons/shoplazza.png" },
  { name: "DanDomain", icon: "/platform-icons/dandomain.png" },
  { name: "Quickbutik", icon: "/platform-icons/quickbutik.png" },
];

const ICON_SIZES = "(min-width: 768px) 56px, 48px";

function PlatformChip({ platform }: { platform: Platform }) {
  return (
    <div className="group flex h-[124px] w-[172px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-white px-4 shadow-[0_10px_30px_-16px_rgba(31,31,31,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_20px_44px_-18px_rgba(111,62,222,0.4)]">
      <div className="relative h-14 w-14">
        <Image
          src={platform.icon}
          alt={`${platform.name} platform icon`}
          fill
          sizes={ICON_SIZES}
          className="object-contain"
        />
      </div>
      <span className="line-clamp-2 text-center text-[11px] font-semibold leading-tight text-body-text">
        {platform.name}
      </span>
    </div>
  );
}

function PlatformRow({
  items,
  direction,
  label,
}: {
  items: Platform[];
  direction: "right" | "left";
  label: string;
}) {
  return (
    <div
      role="region"
      aria-label={`${label} logos, auto-scrolling`}
      className="plat-row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)]"
    >
      {/* Two identical tile sets -> translateX(-50%) loops seamlessly */}
      <div
        className={`flex w-max ${direction === "right" ? "plat-track-right" : "plat-track-left"}`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1}>
            {items.map((platform) => (
              <PlatformChip key={platform.name} platform={platform} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupLabel({ children }: { children: string }) {
  return (
    <div className="container-site mb-5 flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-brand/70" />
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-heading">
        {children}
      </h3>
    </div>
  );
}

export function PlatformsShowcaseSection() {
  return (
    <section
      id="platforms"
      aria-labelledby="platforms-heading"
      className="relative scroll-mt-20 overflow-hidden bg-white py-16 sm:py-24"
    >
      {/* Premium background: soft brand glows + faint dot grid + top hairline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[110px]" />
        <div className="absolute bottom-[-160px] left-[-120px] h-[360px] w-[360px] rounded-full bg-btn-purple/[0.06] blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(31,31,31,0.35)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]" />
      </div>

      <div className="relative">
        <FadeIn>
          <div className="container-site flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-heading">
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
              <span aria-hidden="true" className="h-px w-8 bg-border" />
            </span>
            <h2
              id="platforms-heading"
              className="mt-4 text-2xl font-semibold leading-tight text-heading sm:text-3xl"
            >
              <span className="block">E-commerce Platforms</span>
              <span className="block text-brand">We Support</span>
            </h2>
          </div>
        </FadeIn>

        <div className="mt-12 space-y-10">
          <FadeIn delay={80}>
            <GroupLabel>Global &amp; widely used platforms</GroupLabel>
            <div className="space-y-5">
              <PlatformRow
                items={globalRowOne}
                direction="right"
                label="Global and widely used platforms, part one"
              />
              <PlatformRow
                items={globalRowTwo}
                direction="left"
                label="Global and widely used platforms, part two"
              />
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <GroupLabel>Europe-focused platforms</GroupLabel>
            <PlatformRow
              items={europePlatforms}
              direction="right"
              label="Europe-focused platforms"
            />
          </FadeIn>

          <FadeIn delay={160}>
            <GroupLabel>Asia &amp; GCC-focused platforms</GroupLabel>
            <PlatformRow
              items={asiaGccPlatforms}
              direction="left"
              label="Asia and GCC-focused platforms"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
