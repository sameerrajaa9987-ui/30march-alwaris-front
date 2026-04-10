import type { SeaBookingFormState } from "@/modules/booking/types";

export const SEA_MODE_OPTIONS = ["Air", "Sea", "Road"] as const;
export const SEA_EXPORT_IMPORT_OPTIONS = [
  "Export",
  "Import",
  "Cross Trade",
] as const;
export const SEA_LINE_OPTIONS = ["ACL", "AGL", "ASR"] as const;
export const SEA_STATUS_OPTIONS = ["Pending", "Done", "Cancel"] as const;
export const SEA_SIZE_OPTIONS = ["20", "40", "45"] as const;
export const SEA_TYPE_OPTIONS = [
  "DC",
  "DV",
  "FR",
  "GP",
  "GV",
  "HC",
  "HD",
  "HQ",
  "ISO",
  "OT",
  "RF",
  "SD",
  "SR",
] as const;
export const SEA_CURRENCY_OPTIONS = ["USD", "AED"] as const;

export function getDefaultSeaBookingForm(): SeaBookingFormState {
  const today = new Date().toISOString().split("T")[0];

  return {
    jobDate: today,
    rateAgreedBy: "",
    bookingParty: "",
    kindAttention: "",
    shipper: "",
    consignee: "",
    modeOfTransport: "Sea",
    exportImport: "Export",
    portOfLoading: "",
    portOfDestination: "",
    line: "",
    status: "Pending",
    terms: "",
    lineOfBix: "",
    mbl: "",
    orderReference: "",
    generatedReference: "",
    containerNo: "",
    qty: 1,
    size: "20",
    type: "GP",
    commodity: "",
    netWeight: 0,
    grossWeight: 0,
    volume: 0,
    vessel: "",
    voyage: "",
    etd: today,
    eta: today,
    currency: "USD",
    billingParty: "",
    hbl: "",
    remarks: "",
  };
}
