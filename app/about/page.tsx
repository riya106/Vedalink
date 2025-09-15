'use client';

import { Sprout, ShieldCheck, QrCode } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const HERO_IMG = "https://images.pexels.com/photos/2278543/pexels-photo-2278543.jpeg";
const TEAM_IMG_1 = "https://images.pexels.com/photos/20458068/pexels-photo-20458068.jpeg";
const TEAM_IMG_2 = "https://images.pexels.com/photos/1043292/pexels-photo-1043292.jpeg";
const TEAM_IMG_3 = "https://images.pexels.com/photos/3019836/pexels-photo-3019836.jpeg";

export default function About() {
  const { t } = useI18n();
  return (
    <div className="bg-background text-foreground">
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--background) / 0.88) 20%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.25)), url(${HERO_IMG})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="relative container py-16 sm:py-20">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t("about.title")}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{t("about.hero.sub")}</p>
        </div>
      </section>

      {/* Story + image */}
      <section className="container grid items-center gap-8 py-12 sm:grid-cols-2 sm:py-16">
        <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow">
          <img src={TEAM_IMG_1} alt="Women-led cooperative at work" className="h-72 w-full object-cover sm:h-[22rem]" loading="lazy" />
        </figure>
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("about.farmerfirst.title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("about.farmerfirst.desc")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label={t("about.stats.producers")} value="1,200+" />
            <Stat label={t("about.stats.batches")} value="9,500+" />
            <Stat label={t("about.stats.scans")} value="250k+" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <GalleryCard src={TEAM_IMG_2} caption="Highland tea—hand‑plucked" />
          <GalleryCard src={TEAM_IMG_3} caption="Orchard harvest and grading" />
          <GalleryCard src={HERO_IMG} caption="Sustainable water and soil" />
        </div>
      </section>

      {/* Values */}
      <section className="container py-12 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("about.values.title")}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Value icon={<Sprout className="h-5 w-5" />} title={t("why.farmer.title")} desc={t("why.farmer.desc")} />
          <Value icon={<ShieldCheck className="h-5 w-5" />} title={t("trust.history.title")} desc={t("trust.history.p1")} />
          <Value icon={<QrCode className="h-5 w-5" />} title={t("trust.scan.title")} desc={t("trust.scan.p2")} />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-extrabold">{value}</div>
    </div>
  );
}

function GalleryCard({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow">
      <img src={src} alt={caption} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-3 text-sm font-medium text-white">
        {caption}
      </figcaption>
    </figure>
  );
}

function Value({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </article>
  );
}
