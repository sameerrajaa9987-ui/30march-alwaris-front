import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight, PackageSearch, Search, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { OFFICE } from "../content";

type Tab = "quote" | "track";

const CARGO_TYPES = [
  "FCL — Full Container Load",
  "LCL — Less than Container Load",
  "Project / Over-Dimension Cargo",
  "Warehousing / 3PL",
  "Inland Transportation",
];

export function TrackQuoteWidget() {
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
    toast.success("Great! Opening your email so our pricing desk can respond.");
  };

  const handleTrack = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const ref = String(data.get("ref") ?? "").trim();
    if (!ref) return;
    // TODO: connect to the shipment-tracking API when available.
    toast.info(
      `Tracking ${ref}: our operations team will share the latest status with you shortly.`,
    );
  };

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
              ? "bg-[#0b1f3a] text-white shadow"
              : "text-slate-600 hover:text-slate-900",
          )}
        >
          <PackageSearch className="size-4" />
          Instant Quote
        </button>
        <button
          type="button"
          onClick={() => setTab("track")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
            tab === "track"
              ? "bg-[#0b1f3a] text-white shadow"
              : "text-slate-600 hover:text-slate-900",
          )}
        >
          <Search className="size-4" />
          Track Shipment
        </button>
      </div>

      <div className="p-4">
        {tab === "quote" ? (
          <form onSubmit={handleQuote} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">
                Cargo type
              </span>
              <select
                name="cargo"
                defaultValue={CARGO_TYPES[0]}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                {CARGO_TYPES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-500">
                  Origin
                </span>
                <input
                  name="origin"
                  required
                  placeholder="e.g. Jebel Ali"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-500">
                  Destination
                </span>
                <input
                  name="destination"
                  required
                  placeholder="e.g. Nhava Sheva"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-5 py-3 text-sm font-semibold text-[#0b1f3a] shadow-lg transition-transform hover:scale-[1.01]"
            >
              Get My Quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleTrack} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">
                Booking / B-L number
              </span>
              <div className="relative">
                <Ship className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="ref"
                  required
                  placeholder="e.g. AWS-2026-00123"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </label>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1f3a] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01]"
            >
              Track &amp; Trace
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-xs text-slate-400">
              Enter your reference and our team will confirm the latest status.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
