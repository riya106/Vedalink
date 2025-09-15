import { MapPin, Award, Leaf, Phone, CalendarDays, Ruler, Star, QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

interface Producer {
  id: string;
  name: string;
  region: string;
  crops: string[];
  certifications: string[];
  phone: string;
  image: string; // cover image
  gallery: string[]; // extra images
  acreage: string;
  methods: string[];
  since: number;
  rating: number; // 1..5
  batches: number;
  lastHarvest: string;
  bio: string;
}

const producers: Producer[] = [
  {
    id: "p1",
    name: "Sita Devi Farms",
    region: "Nagpur, Maharashtra",
    crops: ["Turmeric", "Tomato"],
    certifications: ["Organic (NPOP)", "Residue Test 2025-Q1"],
    phone: "+91 98200 12345",
    image: "https://images.pexels.com/photos/20458068/pexels-photo-20458068.jpeg",
    gallery: [
      "https://images.pexels.com/photos/20527455/pexels-photo-20527455.jpeg",
      "https://images.pexels.com/photos/2278543/pexels-photo-2278543.jpeg",
      "https://images.pexels.com/photos/11573790/pexels-photo-11573790.jpeg"
    ],
    acreage: "6.2 acres",
    methods: ["Natural farming", "Rainwater harvesting", "Drip irrigation"],
    since: 2017,
    rating: 4.7,
    batches: 28,
    lastHarvest: "2025-05-18",
    bio: "Women-led cooperative practicing natural farming with rainwater harvesting and crop rotation.",
  },
  {
    id: "p2",
    name: "Green Valley Tea",
    region: "Munnar, Kerala",
    crops: ["Tea"],
    certifications: ["Fairtrade", "Rainforest Alliance"],
    phone: "+91 98191 22334",
    image: "https://images.pexels.com/photos/1043292/pexels-photo-1043292.jpeg",
    gallery: [
      "https://images.pexels.com/photos/6713249/pexels-photo-6713249.jpeg",
      "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg",
      "https://images.pexels.com/photos/268832/pexels-photo-268832.jpeg"
    ],
    acreage: "18.5 acres",
    methods: ["Shade-grown", "Manual plucking", "Soil health tracking"],
    since: 2012,
    rating: 4.8,
    batches: 54,
    lastHarvest: "2025-04-30",
    bio: "Smallholder network producing hand-plucked highland tea with soil health tracking.",
  },
  {
    id: "p3",
    name: "Kavya Horticulture",
    region: "Kolar, Karnataka",
    crops: ["Mango", "Papaya"],
    certifications: ["GLOBALG.A.P."],
    phone: "+91 90040 77882",
    image: "https://images.pexels.com/photos/7782084/pexels-photo-7782084.jpeg",
    gallery: [
      "https://images.pexels.com/photos/3019836/pexels-photo-3019836.jpeg",
      "https://images.pexels.com/photos/1406880/pexels-photo-1406880.jpeg",
      "https://images.pexels.com/photos/33816611/pexels-photo-33816611.jpeg"
    ],
    acreage: "12.0 acres",
    methods: ["Integrated pest management", "Solar cold room", "Compost mulch"],
    since: 2015,
    rating: 4.6,
    batches: 37,
    lastHarvest: "2025-05-08",
    bio: "Family farm with integrated pest management and solar-powered cold room.",
  },
];

export default function Producers() {
  const { t } = useI18n();
  return (
    <section className="container py-12 sm:py-16">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t("producers.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("producers.desc")}</p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {producers.map((p) => (
          <ProducerCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

function ProducerCard({ p }: { p: Producer }) {
  const [main, setMain] = useState(p.image);
  const stars = Math.round(p.rating);
  const { t } = useI18n();

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow">
      <img src={main} alt={p.name} className="h-52 w-full object-cover" loading="lazy" />
      <div className="p-5">
        <h2 className="text-lg font-semibold leading-tight">{p.name}</h2>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{p.region}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{p.bio}</p>

        {/* badges */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {p.crops.map((c) => (
            <span key={c} className="rounded-full bg-primary/10 px-2 py-0.5 text-primary ring-1 ring-border">{c}</span>
          ))}
          {p.certifications.map((c) => (
            <span key={c} className="rounded-full bg-accent/10 px-2 py-0.5 text-accent-foreground ring-1 ring-border">{c}</span>
          ))}
        </div>

        {/* facts */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Fact icon={<Ruler className="h-4 w-4" />} label={t("producers.fact.acreage")} value={p.acreage} />
          <Fact icon={<CalendarDays className="h-4 w-4" />} label={t("producers.fact.since")} value={String(p.since)} />
          <Fact icon={<ShieldCheck className="h-4 w-4" />} label={t("producers.fact.batches")} value={String(p.batches)} />
          <Fact icon={<CalendarDays className="h-4 w-4" />} label={t("producers.fact.last")} value={p.lastHarvest} />
        </div>

        <div className="mt-2 flex items-center gap-1 text-amber-500" aria-label={`Rating ${p.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < stars ? "fill-current" : "opacity-30"}`} />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">{p.rating.toFixed(1)}</span>
        </div>

        {/* methods */}
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
          {p.methods.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>

        {/* contact + actions */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <div className="inline-flex items-center gap-1 text-muted-foreground"><Phone className="h-4 w-4" />{p.phone}</div>
          <button className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted/60"><QrCode className="h-4 w-4" />{t("producers.viewTrace")}</button>
        </div>

        {/* gallery */}
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {[p.image, ...p.gallery].map((src, i) => (
            <button key={i} onClick={() => setMain(src)} className={`h-14 w-20 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-border ${main===src?"outline outline-2 outline-primary":""}`} aria-label="Select image">
              <img src={src} alt="gallery" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
