import { z } from "zod";

export const seaBookingRowSchema = z.object({
  jobDate: z.string().trim().min(1, "Job Date is required"),
  rateAgreedBy: z.string().trim(),
  bookingParty: z.string().trim(),
  kindAttention: z.string().trim(),
  shipper: z.string().trim(),
  consignee: z.string().trim(),
  modeOfTransport: z.enum(["Air", "Sea", "Road"]),
  exportImport: z.enum(["Export", "Import", "Cross Trade"]),
  portOfLoading: z.string().trim(),
  portOfDestination: z.string().trim(),
  line: z.enum(["", "ACL", "AGL", "ASR"]),
  status: z.enum(["Pending", "Done", "Cancel"]),
  terms: z.string().trim(),
  lineOfBix: z.string().trim(),
  mbl: z.string().trim(),
  orderReference: z.string().trim(),
  generatedReference: z
    .string()
    .trim()
    .min(1, "Generate Reference is required"),
  containerNo: z.string().trim(),
  qty: z.number().min(1, "Qty must be at least 1"),
  size: z.enum(["20", "40", "45"]),
  type: z.enum([
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
  ]),
  commodity: z.string().trim(),
  netWeight: z.number().min(0, "Net Weight cannot be negative"),
  grossWeight: z.number().min(0, "Gross Weight cannot be negative"),
  volume: z.number().min(0, "Volume cannot be negative"),
  vessel: z.string().trim(),
  voyage: z.string().trim(),
  etd: z.string().trim().min(1, "ETD is required"),
  eta: z.string().trim().min(1, "ETA is required"),
  currency: z.enum(["USD", "AED"]),
  billingParty: z.string().trim(),
  hbl: z.string().trim(),
  remarks: z.string().trim(),
});

export const seaBookingIncomeDetailSchema = z.object({
  incomeBillingPartyId: z
    .string()
    .trim()
    .min(1, "Income Billing Party is required"),
  chargeDescriptionId: z
    .string()
    .trim()
    .min(1, "Charge Description is required"),
  chargedPer: z.enum(["DOCS", "CONT"]),
  qty: z.number().min(1, "Qty must be at least 1"),
  rate: z.number().min(0, "Rate cannot be negative"),
  currency: z.enum(["USD", "AED"]),
  size: z.enum(["20", "40", "45"]),
  type: z.enum([
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
  ]),
  amount: z.number().min(0, "Amount cannot be negative"),
  exRate: z.number().min(0, "ExRate cannot be negative"),
  remarks: z.string().trim(),
});

export const seaBookingExpenseDetailSchema = z.object({
  vendorId: z.string().trim().min(1, "Vendor Name is required"),
  chargeDescriptionId: z
    .string()
    .trim()
    .min(1, "Charge Description is required"),
  chargedPer: z.enum(["DOCS", "CONT"]),
  qty: z.number().min(1, "Qty must be at least 1"),
  rate: z.number().min(0, "Rate cannot be negative"),
  currency: z.enum(["USD", "AED"]),
  size: z.enum(["20", "40", "45"]),
  type: z.enum([
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
  ]),
  amount: z.number().min(0, "Amount cannot be negative"),
  exRate: z.number().min(0, "ExRate cannot be negative"),
  invoiceNo: z.string().trim(),
  date: z.string().trim().min(1, "Date is required"),
  remarks: z.string().trim(),
});

export type SeaBookingRowSchema = z.infer<typeof seaBookingRowSchema>;
export type SeaBookingIncomeDetailSchema = z.infer<
  typeof seaBookingIncomeDetailSchema
>;
export type SeaBookingExpenseDetailSchema = z.infer<
  typeof seaBookingExpenseDetailSchema
>;
