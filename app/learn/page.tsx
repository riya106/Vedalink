import { Tractor, Warehouse, Factory, Truck, Store, QrCode, ShieldCheck, FileCheck2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const HERO_IMG = "https://images.pexels.com/photos/2278543/pexels-photo-2278543.jpeg";
const BLOCKCHAIN_IMG = "https://images.pexels.com/photos/268832/pexels-photo-268832.jpeg";
const PROCESS_IMG = "https://images.pexels.com/photos/2889193/pexels-photo-2889193.jpeg";
const TRUCK_IMG = "https://images.pexels.com/photos/1406880/pexels-photo-1406880.jpeg";
const SCAN_IMG = "https://images.pexels.com/photos/12935049/pexels-photo-12935049.jpeg";

export default function Learn() {
  const { t } = useI18n();
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
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
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t("learn.title")}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{t("learn.sub")}</p>
          <div className="mt-6 flex gap-3">
            <Link to="/login" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-95">{t("learn.try")}</Link>
            <a href="#flow" className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/60">{t("learn.viewFlow")}</a>
          </div>
        </div>
      </section>

      {/* Flowchart */}
      <section id="flow" className="container py-12 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("learn.flow.title")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("learn.flow.sub")}</p>

        <div className="mt-8 space-y-6">
          <StepRow icon={<Tractor className="h-5 w-5" />} title={t("flow.card.farm.title")} img={HERO_IMG} points={[t("flow.card.farm.desc")]} />
          <FlowConnector />
          <StepRow icon={<Warehouse className="h-5 w-5" />} title={t("flow.card.collection.title")} img={PROCESS_IMG} points={[t("flow.card.collection.desc")]} />
          <FlowConnector />
          <StepRow icon={<Factory className="h-5 w-5" />} title={t("flow.card.process.title")} img={PROCESS_IMG} points={[t("flow.card.process.desc")]} />
          <FlowConnector />
          <StepRow icon={<Truck className="h-5 w-5" />} title={t("flow.card.logistics.title")} img={TRUCK_IMG} points={[t("flow.card.logistics.desc")]} />
          <FlowConnector />
          <StepRow icon={<Store className="h-5 w-5" />} title={t("flow.card.retail.title")} img={SCAN_IMG} points={[t("flow.card.retail.desc")]} />
          <FlowConnector />
          <StepRow icon={<QrCode className="h-5 w-5" />} title={t("flow.card.scan.title")} img={SCAN_IMG} points={[t("flow.card.scan.desc")]} />
        </div>
      </section>

      {/* Feature deep‑dives */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("learn.topics")}</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <LearnCard
              img={BLOCKCHAIN_IMG}
              title={t("learn.card.onchain")}
              icon={<ShieldCheck className="h-5 w-5" />}
              items={[t("learn.card.onchain.p1"), t("learn.card.onchain.p2"), t("learn.card.onchain.p3")]}
            />
            <LearnCard
              img={PROCESS_IMG}
              title={t("learn.card.lifecycle")}
              icon={<FileCheck2 className="h-5 w-5" />}
              items={[t("learn.card.lifecycle.p1"), t("learn.card.lifecycle.p2"), t("learn.card.lifecycle.p3")]}
            />
            <LearnCard
              img={SCAN_IMG}
              title={t("learn.card.scan")}
              icon={<Eye className="h-5 w-5" />}
              items={[t("learn.card.scan.p1"), t("learn.card.scan.p2"), t("learn.card.scan.p3")]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StepRow({ icon, title, img, points }: { icon: React.ReactNode; title: string; img: string; points: string[] }) {
  return (
    <article className="grid items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow sm:grid-cols-[240px_1fr]">
      <img src={img} alt={title} className="h-40 w-full rounded-lg object-cover sm:h-44" loading="lazy" />
      <div>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border">{icon}</div>
        <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground">
          {points.map((p, i) => (
            <li key={i} className="flex gap-2"><span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />{p}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function FlowConnector() {
  return (
    <div className="relative mx-auto h-8 w-1 rounded-full bg-primary/30 sm:ml-[120px] sm:mr-0 sm:h-12">
      <span className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-primary" />
    </div>
  );
}

function LearnCard({ img, title, icon, items }: { img: string; title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow">
      <img src={img} alt={title} className="h-40 w-full object-cover" loading="lazy" />
      <div className="p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border">{icon}</div>
        <h3 className="mt-3 text-lg font-semibold">{title}</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          {items.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
