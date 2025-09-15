import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Plus,
  ChevronDown,
  ChevronUp,
  Loader2,
  QrCode,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  IndianRupee,
  Banknote,
  Users2,
  HelpCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Types
type Status = "Pending" | "In Transit" | "Sold";
interface Batch {
  id: string;
  productType: string;
  name: string;
  quality: string;
  price: number;
  status: Status;
  createdAt: number;
  soldAt?: number;
}

interface RequestItem {
  id: string;
  buyer: string;
  product: string;
  qty: string;
  status: "Pending" | "Approved" | "Denied";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    const token = localStorage.getItem("agri_auth_token");
    if (!token) navigate("/login", { replace: true });
  }, [navigate]);

  const [active, setActive] = useState<"batches" | "sales" | "requests" | "help">("batches");

  // Seed data
  const [batches, setBatches] = useState<Batch[]>([
    { id: "B-102341", productType: "Vegetable", name: "Tomato Roma", quality: "A", price: 1200, status: "Pending", createdAt: Date.now() - 86400000 * 2 },
    { id: "B-102512", productType: "Tea", name: "Highland Green", quality: "A", price: 5400, status: "In Transit", createdAt: Date.now() - 86400000 },
    { id: "B-102278", productType: "Fruit", name: "Alphonso Mango", quality: "A", price: 8000, status: "Sold", createdAt: Date.now() - 86400000 * 4, soldAt: Date.now() - 3600000 * 12 },
  ]);

  const [requests, setRequests] = useState<RequestItem[]>([
    { id: "R-9001", buyer: "FreshCart Distributors", product: "Tomato Roma", qty: "120 kg", status: "Pending" },
    { id: "R-9002", buyer: "CityMart Retail", product: "Highland Green Tea", qty: "80 kg", status: "Pending" },
  ]);

  const logout = () => {
    localStorage.removeItem("agri_auth_token");
    navigate("/login", { replace: true });
  };

  return (
    <section className="container py-6 sm:py-10">
      {/* Top bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("dash.title")}</h1>
        <div className="flex gap-2">
          <button onClick={() => setActive("batches")} className={`h-9 rounded-md border px-3 text-sm ${active === "batches" ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted/60"}`}>{t("dash.tab.batches")}</button>
          <button onClick={() => setActive("sales")} className={`h-9 rounded-md border px-3 text-sm ${active === "sales" ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted/60"}`}>{t("dash.tab.sales")}</button>
          <button onClick={() => setActive("requests")} className={`h-9 rounded-md border px-3 text-sm ${active === "requests" ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted/60"}`}>{t("dash.tab.requests")}</button>
          <button onClick={() => setActive("help")} className={`h-9 rounded-md border px-3 text-sm ${active === "help" ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted/60"}`}>{t("dash.tab.help")}</button>
          <button onClick={logout} className="h-9 rounded-md border px-3 text-sm hover:bg-muted/60">{t("dash.logout")}</button>
        </div>
      </div>

      {/* Profile header */}
      <ProfileHeader />

      {active === "batches" && (
        <BatchesSection batches={batches} setBatches={setBatches} />
      )}

      {active === "sales" && <SalesSection batches={batches} />}

      {active === "requests" && (
        <RequestsSection requests={requests} setRequests={setRequests} />
      )}

      {active === "help" && <HelpSection />}
    </section>
  );
}

function ProfileHeader() {
  return (
    <div className="mb-6 grid gap-4 rounded-2xl border border-border bg-card p-5 shadow sm:grid-cols-[120px_1fr]">
      <img
        src="https://images.pexels.com/photos/7782084/pexels-photo-7782084.jpeg"
        alt="Farmer profile"
        className="h-28 w-28 rounded-xl object-cover"
        loading="lazy"
      />
      <div className="grid gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-lg font-semibold leading-tight">Sita Devi</div>
          <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> Nagpur, Maharashtra
          </div>
          <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" /> +91 98200 12345
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <Stat label="Active batches" value="5" icon={<Package className="h-4 w-4" />} />
          <Stat label="In transit" value="2" icon={<Truck className="h-4 w-4" />} />
          <Stat label="On-time rate" value="96%" icon={<Clock className="h-4 w-4" />} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-xs">{label}</span></div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function BatchesSection({ batches, setBatches }: { batches: Batch[]; setBatches: React.Dispatch<React.SetStateAction<Batch[]>> }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrFor, setQrFor] = useState<string | null>(null);

  // form state
  const [productType, setProductType] = useState("Vegetable");
  const [name, setName] = useState("");
  const [quality, setQuality] = useState("A");
  const [price, setPrice] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    const id = generateBatchId();
    const newBatch: Batch = {
      id,
      productType,
      name,
      quality,
      price: Number(price),
      status: "Pending",
      createdAt: Date.now(),
    };
    setLoading(true);
    setQrFor(null);
    setTimeout(() => {
      setBatches((prev) => [newBatch, ...prev]);
      setLoading(false);
      setQrFor(id);
      setName("");
      setPrice("");
    }, 1200);
  };

  const updateStatus = (id: string, status: Status) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, soldAt: status === "Sold" ? Date.now() : b.soldAt } : b)),
    );
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("dash.add.title")}</h2>
        <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted/60">
          <Plus className="h-4 w-4" /> {open ? t("dash.add.close") : t("dash.add.add")} {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow">
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t("dash.form.productType")}</label>
              <select value={productType} onChange={(e) => setProductType(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option>Vegetable</option>
                <option>Fruit</option>
                <option>Tea</option>
                <option>Grain</option>
                <option>Dairy</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t("dash.form.name")}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Tomato Roma" className="h-10 rounded-md border border-input bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t("dash.form.quality")}</label>
              <select value={quality} onChange={(e) => setQuality(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t("dash.form.price")}</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1200" className="h-10 rounded-md border border-input bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow hover:opacity-95">
                {t("dash.form.submit")}
              </button>
            </div>
          </form>
          {loading && (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> {t("dash.form.generating")}
            </div>
          )}
          {qrFor && (
            <div className="mt-4 grid gap-2">
              <div className="text-sm font-medium">{t("dash.form.batchQr")}</div>
              <div className="inline-flex items-center gap-3">
                <MiniQR text={qrFor} />
                <code className="rounded bg-muted px-2 py-1 text-xs">{qrFor}</code>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <h2 className="mb-2 text-xl font-semibold">{t("dash.table.title")}</h2>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="px-4 py-3 text-left">{t("dash.table.batchId")}</th>
              <th className="px-4 py-3 text-left">{t("dash.table.product")}</th>
              <th className="px-4 py-3 text-left">{t("dash.table.quality")}</th>
              <th className="px-4 py-3 text-left">{t("dash.table.price")}</th>
              <th className="px-4 py-3 text-left">{t("dash.table.status")}</th>
              <th className="px-4 py-3 text-left">{t("dash.table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{b.id}</td>
                <td className="px-4 py-3">{b.productType} – {b.name}</td>
                <td className="px-4 py-3">{b.quality}</td>
                <td className="px-4 py-3 inline-flex items-center gap-1"><IndianRupee className="h-4 w-4" />{b.price.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => updateStatus(b.id, "Pending")} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted/60">{t("dash.action.markPending")}</button>
                    <button onClick={() => updateStatus(b.id, "In Transit")} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted/60">{t("dash.action.inTransit")}</button>
                    <button onClick={() => updateStatus(b.id, "Sold")} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted/60">{t("dash.action.sold")}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const { t } = useI18n();
  const cfg = {
    "Pending": { icon: <Clock className="h-3.5 w-3.5" />, cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400", text: t("status.pending") },
    "In Transit": { icon: <Truck className="h-3.5 w-3.5" />, cls: "bg-sky-500/10 text-sky-600 dark:text-sky-400", text: t("status.transit") },
    "Sold": { icon: <CheckCircle2 className="h-3.5 w-3.5" />, cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", text: t("status.sold") },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.cls}`}>
      {cfg.icon}
      {cfg.text}
    </span>
  );
}

function SalesSection({ batches }: { batches: Batch[] }) {
  const { t } = useI18n();
  const sold = batches.filter((b) => b.status === "Sold");
  const total = useMemo(() => sold.reduce((acc, b) => acc + b.price, 0), [sold]);

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-border bg-card p-5 shadow">
        <div className="flex items-center gap-2 text-muted-foreground"><Banknote className="h-5 w-5" /><span className="text-sm">{t("dash.sales.total")}</span></div>
        <div className="mt-1 flex items-center gap-1 text-3xl font-extrabold"><IndianRupee className="h-7 w-7" />{total.toLocaleString()}</div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5 shadow">
        <h3 className="text-base font-semibold">{t("dash.sales.recent")}</h3>
        <ul className="mt-3 divide-y">
          {sold.length === 0 && <li className="py-3 text-sm text-muted-foreground">{t("dash.sales.none")}</li>}
          {sold.map((b) => (
            <li key={b.id} className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-medium">{b.name}</span>
                <span className="text-muted-foreground">• {b.productType}</span>
              </div>
              <div className="inline-flex items-center gap-1"><IndianRupee className="h-4 w-4" />{b.price.toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RequestsSection({ requests, setRequests }: { requests: RequestItem[]; setRequests: React.Dispatch<React.SetStateAction<RequestItem[]>> }) {
  const { t } = useI18n();
  const act = (id: string, status: "Approved" | "Denied") => setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-border bg-card p-5 shadow">
        <h3 className="text-base font-semibold">{t("dash.requests.title")}</h3>
        <ul className="mt-3 divide-y">
          {requests.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
              <div className="flex min-w-0 items-center gap-3">
                <Users2 className="h-4 w-4 text-primary" />
                <div className="truncate">
                  <span className="font-medium">{r.buyer}</span>
                  <span className="text-muted-foreground"> • {r.product} • {r.qty}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {r.status === "Pending" ? (
                  <>
                    <button onClick={() => act(r.id, "Approved")} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-emerald-500/10">{t("dash.requests.approve")}</button>
                    <button onClick={() => act(r.id, "Denied")} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-rose-500/10">{t("dash.requests.deny")}</button>
                  </>
                ) : (
                  <span className={`rounded-full px-2 py-0.5 text-xs ${r.status === "Approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}>{r.status}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HelpSection() {
  const { t } = useI18n();
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border"><HelpCircle className="h-5 w-5" /></div>
        <h3 className="mt-3 text-lg font-semibold">{t("dash.help.tutorial")}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t("learn.sub")}</p>
        <Link to="/learn" className="mt-3 inline-block rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted/60">{t("dash.help.openGuide")}</Link>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border"><Phone className="h-5 w-5" /></div>
        <h3 className="mt-3 text-lg font-semibold">{t("dash.help.helpline")}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t("dash.help.needHelp")}</p>
        <a href="tel:+919820012345" className="mt-3 inline-block rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-95">+91 98200 12345</a>
      </div>
    </div>
  );
}

function generateBatchId() {
  const n = Date.now().toString().slice(-6);
  return `B-${n}`;
}

// Tiny pseudo-QR purely for visual feedback (not a real QR)
function MiniQR({ text }: { text: string }) {
  const size = 21; // 21x21
  const cells: number[] = [];
  let seed = 0;
  for (let i = 0; i < text.length; i++) seed = (seed * 31 + text.charCodeAt(i)) >>> 0;
  for (let i = 0; i < size * size; i++) {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    cells.push(seed & 1);
  }
  const cellPx = 4;
  const dim = size * cellPx;
  return (
    <svg width={dim} height={dim} className="rounded bg-white p-1 ring-1 ring-border">
      {cells.map((v, i) => {
        const x = (i % size) * cellPx;
        const y = Math.floor(i / size) * cellPx;
        return v ? <rect key={i} x={x} y={y} width={cellPx} height={cellPx} fill="hsl(var(--foreground))" /> : null;
      })}
    </svg>
  );
}
