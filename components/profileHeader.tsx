import { Package, Truck, Clock, MapPin, Phone } from "lucide-react";

function ProfileHeader() {
  return (
    <div className="mb-6 grid gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow sm:grid-cols-[120px_1fr]">
      <img
        src="https://images.pexels.com/photos/7782084/pexels-photo-7782084.jpeg"
        alt="Farmer profile"
        className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-cover mx-auto sm:mx-0"
        loading="lazy"
      />
      <div className="grid gap-2">
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
          <div className="text-base sm:text-lg font-semibold leading-tight">
            Sita Devi
          </div>
          <div className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> Nagpur, Maharashtra
          </div>
          <div className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
            <Phone className="h-4 w-4" /> +91 98200 12345
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
          <Stat
            label="Active batches"
            value="5"
            icon={<Package className="h-4 w-4" />}
          />
          <Stat
            label="In transit"
            value="2"
            icon={<Truck className="h-4 w-4" />}
          />
          <Stat
            label="On-time rate"
            value="96%"
            icon={<Clock className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-xs">{label}</span></div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
