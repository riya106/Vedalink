'use client';

import { QrCode, ShieldCheck, Sprout, Lock, FileCheck2, Eye, Tractor, Warehouse, Factory, Truck, Store, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { useState } from "react";

const HERO_IMG =
  "https://images.pexels.com/photos/2278543/pexels-photo-2278543.jpeg"; // Aerial farmland sunrise
const BLOCKCHAIN_IMG =
  "https://images.pexels.com/photos/268832/pexels-photo-268832.jpeg"; // Abstract teal network feel
const TRUCK_IMG =
  "https://images.pexels.com/photos/1406880/pexels-photo-1406880.jpeg"; // Produce logistics truck
const PRODUCE_IMG =
  "https://images.pexels.com/photos/33816611/pexels-photo-33816611.jpeg"; // Fresh market produce

// Trust through transparency assets
const SCAN_IMG = "https://images.pexels.com/photos/12935049/pexels-photo-12935049.jpeg"; // QR scan in store
const CERT_IMG = "https://images.pexels.com/photos/9858904/pexels-photo-9858904.jpeg"; // Document + stamp
const HANDSHAKE_IMG = "https://images.pexels.com/photos/7578914/pexels-photo-7578914.jpeg"; // Handshake / trust
const DASHBOARD_IMG = "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg"; // Analytics dashboard

// Traceability flow assets
const FARM_IMG = HERO_IMG;
const COLLECTION_IMG = "https://images.pexels.com/photos/17993118/pexels-photo-17993118.jpeg"; // Coop collection
const PROCESS_IMG = "https://images.pexels.com/photos/2889193/pexels-photo-2889193.jpeg"; // Factory conveyor
const LOGISTICS_IMG = TRUCK_IMG;
const RETAIL_IMG = SCAN_IMG;
const CONSUMER_IMG = PRODUCE_IMG;

const FLOW_STEPS = [
  { key: "farm", label: "Farm", Icon: Tractor, img: FARM_IMG },
  { key: "collection", label: "Collection", Icon: Warehouse, img: COLLECTION_IMG },
  { key: "process", label: "Process", Icon: Factory, img: PROCESS_IMG },
  { key: "logistics", label: "Logistics", Icon: Truck, img: LOGISTICS_IMG },
  { key: "retail", label: "Retail", Icon: Store, img: RETAIL_IMG },
  { key: "scan", label: "Scan", Icon: QrCode, img: CONSUMER_IMG },
] as const;

export default function Index() {
  const { t } = useI18n();
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className="bg-background text-foreground">
      {/* Hero with background image */}
      <section className="px-20 relative min-h-[72vh] overflow-hidden" aria-label="Hero">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--background) / 0.85) 15%, hsl(var(--background) / 0.65) 40%, hsl(var(--background) / 0.3) 60%, hsl(var(--background) / 0) 80%), url(${HERO_IMG})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="pointer-events-none absolute -right-40 top-20 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="relative container px-4 py-24 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground ring-1 ring-border">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("hero.loginCta")}
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted/60"
            >
              {t("hero.learnMore")}
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl text-sm text-muted-foreground">
            <div className="rounded-md bg-white/60 dark:bg-white/5 p-3 ring-1 ring-border backdrop-blur">
              {t("hero.pill.simple")}
            </div>
            <div className="rounded-md bg-white/60 dark:bg-white/5 p-3 ring-1 ring-border backdrop-blur">
              {t("hero.pill.tamper")}
            </div>
            <div className="rounded-md bg-white/60 dark:bg-white/5 p-3 ring-1 ring-border backdrop-blur">
              {t("hero.pill.qr")}
            </div>
          </div>
        </div>
      </section>

      {/* Visual collage */}
      <section className="relative px-26 py-12 sm:py-16">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ImageCard src={PRODUCE_IMG} alt="Fresh market produce" tag={t("collage.farm.tag")} caption={t("collage.farm.cap")} />
            <ImageCard src={TRUCK_IMG} alt="Produce logistics truck" tag={t("collage.log.tag")} caption={t("collage.log.cap")} />
            <ImageCard src={BLOCKCHAIN_IMG} alt="Abstract teal network" tag={t("collage.chain.tag")} caption={t("collage.chain.cap")} />
          </div>
        </div>
      </section>

      {/* Traceability & Flow */}
      <section id="traceability" className="px-26 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("trace.title")}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            {t("trace.title")}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <StepCard img={FARM_IMG} alt="Farm harvest" icon={<Tractor className="h-5 w-5" />} title={t("flow.card.farm.title")} snippet={``} desc={t("flow.card.farm.desc")} />
            <StepCard img={COLLECTION_IMG} alt="Coop collection" icon={<Warehouse className="h-5 w-5" />} title={t("flow.card.collection.title")} snippet={``} desc={t("flow.card.collection.desc")} />
            <StepCard img={PROCESS_IMG} alt="Processing plant" icon={<Factory className="h-5 w-5" />} title={t("flow.card.process.title")} snippet={``} desc={t("flow.card.process.desc")} />
            <StepCard img={LOGISTICS_IMG} alt="Cold-chain logistics" icon={<Truck className="h-5 w-5" />} title={t("flow.card.logistics.title")} snippet={``} desc={t("flow.card.logistics.desc")} />
            <StepCard img={RETAIL_IMG} alt="Retail scanning" icon={<Store className="h-5 w-5" />} title={t("flow.card.retail.title")} snippet={``} desc={t("flow.card.retail.desc")} />
            <StepCard img={CONSUMER_IMG} alt="Consumer" icon={<QrCode className="h-5 w-5" />} title={t("flow.card.scan.title")} snippet={``} desc={t("flow.card.scan.desc")} />
          </div>

          {/* Interactive stepper diagram */}
          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[920px] rounded-2xl border border-border bg-card p-6 shadow">
              <div className="relative px-2">
                {/* VedaLink logo at start + arrow connectors */}
                <div className="relative z-10 -mt-2 flex items-center gap-3">
                  <VLogo />
                  {FLOW_STEPS.map((s, i) => (
                    <div key={s.key} className="flex items-center gap-3">
                      <ArrowConnector />
                      <StepperNode
                        label={t((`flow.step.${s.key}`) as any)}
                        Icon={s.Icon}
                        active={i === activeStep}
                        onClick={() => setActiveStep(i)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* preview */}
              <div className="mt-6 grid items-center gap-4 md:grid-cols-[320px_1fr]">
                <img src={FLOW_STEPS[activeStep].img} alt={t((`flow.step.${FLOW_STEPS[activeStep].key}`) as any)} className="h-40 w-full rounded-lg object-cover md:h-44" loading="lazy" />
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold text-foreground">{t((`flow.step.${FLOW_STEPS[activeStep].key}`) as any)}</div>
                  Click steps to preview the journey. Use the table below to see full details.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust through transparency */}
      <section className="px-26 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("trust.title")}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{t("trust.desc")}</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <TrustCard
              img={SCAN_IMG}
              alt="Scanning QR code on product"
              icon={<QrCode className="h-5 w-5" />}
              title={t("trust.scan.title")}
              points={[t("trust.scan.p1"), t("trust.scan.p2"), t("trust.scan.p3")]}
            />
            <TrustCard
              img={CERT_IMG}
              alt="Stamped certificate document"
              icon={<FileCheck2 className="h-5 w-5" />}
              title={t("trust.quality.title")}
              points={[t("trust.quality.p1"), t("trust.quality.p2"), t("trust.quality.p3")]}
            />
            <TrustCard
              img={DASHBOARD_IMG}
              alt="Analytics dashboard with charts"
              icon={<Eye className="h-5 w-5" />}
              title={t("trust.history.title")}
              points={[t("trust.history.p1"), t("trust.history.p2"), t("trust.history.p3")]}
            />
            <TrustCard
              img={HANDSHAKE_IMG}
              alt="Handshake symbolizing trusted trade"
              icon={<Lock className="h-5 w-5" />}
              title={t("trust.fair.title")}
              points={[t("trust.fair.p1"), t("trust.fair.p2"), t("trust.fair.p3")]}
            />
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="px-26 bg-muted/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("why.title")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={<Sprout className="h-5 w-5" />} title={t("why.farmer.title")} desc={t("why.farmer.desc")} />
            <Feature icon={<ShieldCheck className="h-5 w-5" />} title={t("why.tamper.title")} desc={t("why.tamper.desc")} />
            <Feature icon={<QrCode className="h-5 w-5" />} title={t("why.qr.title")} desc={t("why.qr.desc")} />
          </div>
        </div>
      </section>
    </div>
  );
}

function ImageCard({ src, alt, tag, caption }: { src: string; alt: string; tag: string; caption: string }) {
  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow">
      <img src={src} alt={alt} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        <span className="inline-flex items-center rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground shadow ring-1 ring-border">
          {tag}
        </span>
        <p className="mt-2 rounded-md bg-background/80 p-2 text-sm text-foreground shadow ring-1 ring-border backdrop-blur">
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

function StepCard({ img, alt, icon, title, snippet, desc }: { img: string; alt: string; icon: React.ReactNode; title: string; snippet: string; desc: string }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow">
      <img src={img} alt={alt} className="h-44 w-full object-cover" loading="lazy" />
      <div className="p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border">
          {icon}
        </div>
        <h3 className="mt-3 text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </article>
  );
}

function VLogo() {
  return (
    <div className="relative flex w-20 shrink-0 flex-col items-center" aria-label="VedaLink">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground ring-1 ring-border shadow">
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path d="M4 6l4.5 12h3L20 6h-3l-4.5 9L8 6H4z" fill="currentColor" />
        </svg>
      </div>
      <div className="mt-2 rounded-md bg-background px-2 py-1 text-[11px] font-semibold ring-1 ring-border shadow-sm">VedaLink</div>
    </div>
  );
}

function StepperNode({ label, Icon, active, onClick }: { label: string; Icon: React.ComponentType<{ className?: string }>; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`relative flex w-36 shrink-0 flex-col items-center focus:outline-none ${active ? "scale-[1.03]" : "opacity-80 hover:opacity-100"}`}>
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-border ${active ? "bg-primary text-primary-foreground shadow" : "bg-primary/10 text-primary"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className={`mt-2 rounded-md px-3 py-1 text-xs font-medium ring-1 ring-border shadow-sm ${active ? "bg-primary/10 text-foreground" : "bg-background"}`}>{label}</div>
    </button>
  );
}

function ArrowConnector() {
  return (
    <div className="inline-flex h-12 items-center">
      <ArrowRight className="h-6 w-6 text-primary" />
    </div>
  );
}


function TrustCard({ img, alt, icon, title, points }: { img: string; alt: string; icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow">
      <div className="grid md:grid-cols-2">
        <img src={img} alt={alt} className="h-56 w-full object-cover md:h-full" loading="lazy" />
        <div className="p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border">
            {icon}
          </div>
          <h3 className="mt-4 text-xl font-semibold leading-tight">{title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {points.map((p, i) => (
              <li key={i} className="flex gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
