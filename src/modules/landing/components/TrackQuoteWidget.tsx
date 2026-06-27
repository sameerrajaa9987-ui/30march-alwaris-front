import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight, PackageSearch, Search, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { OFFICE } from "../content";
import { useT } from "../i18n/language";

type Tab = "quote" | "track";

export function TrackQuoteWidget() {
  const t = useT();
  const [tab, setTab] = useState<Tab>("quote");

  const handleQuote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const cargo = String(data.get("cargo") ?? "");
    const origin = String(data.get("origin") ?? "");
    const destination = String(data.get("destination") ?? "");

    const subject = encodeURIComponent(`Instant quote request — ${cargo}`);
    const body = encodeURIComponent(
      `Cargo type: ${cargo}\nOrigin: ${origin}\nDestination: ${destination}\n\nPlease send me a competitive quote.`,
    );
    window.location.href = `mailto:${OFFICE.email}?subject=${subject}&body=${body}`;
    toast.success(t.widget.quoteToast);
  };

  const handleTrack = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const ref = String(data.get("ref") ?? "").trim();
    if (!ref) return;
    // TODO: connect to the shipment-tracking API when available.
    toast.info(t.widget.trackToast(ref));
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20";

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-md">
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setTab("quote")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
            tab === "quote"
              ? "bg-brand text-white shadow"
              : "text-slate-600 hover:text-slate-900",
          )}
        >
          <PackageSearch className="size-4" />
          {t.widget.instantQuote}
        </button>
        <button
          type="button"
          onClick={() => setTab("track")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
            tab === "track"
              ? "bg-brand text-white shadow"
              : "text-slate-600 hover:text-slate-900",
          )}
        >
          <Search className="size-4" />
          {t.widget.trackShipment}
        </button>
      </div>

      <div className="p-4">
        {tab === "quote" ? (
          <form onSubmit={handleQuote} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">
                {t.widget.cargoType}
              </span>
              <select
                name="cargo"
                defaultValue={t.widget.cargoTypes[0]}
                className={inputClass}
              >
                {t.widget.cargoTypes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-500">
                  {t.widget.origin}
                </span>
                <input
                  name="origin"
                  required
                  placeholder={t.widget.originPh}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-500">
                  {t.widget.destination}
                </span>
                <input
                  name="destination"
                  required
                  placeholder={t.widget.destinationPh}
                  className={inputClass}
                />
              </label>
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ocean px-5 py-3 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.01]"
            >
              {t.widget.getMyQuote}
              <ArrowRight
                data-flip-rtl
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </form>
        ) : (
          <form onSubmit={handleTrack} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">
                {t.widget.bookingNumber}
              </span>
              <div className="relative">
                <Ship className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="ref"
                  required
                  placeholder="e.g. AWS-2026-00123"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pe-3 ps-9 text-sm text-slate-800 outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
                />
              </div>
            </label>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01]"
            >
              {t.widget.trackTrace}
              <ArrowRight
                data-flip-rtl
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </button>
            <p className="text-center text-xs text-slate-400">
              {t.widget.trackHint}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
