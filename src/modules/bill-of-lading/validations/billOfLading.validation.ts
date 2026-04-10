import { z } from "zod";

export const billOfLadingContainerSchema = z.object({
  containerNo: z.string().trim().min(1, "Container No is required"),
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
  agentSeal: z.string().trim(),
  customSeal: z.string().trim(),
  piece: z.number().min(0, "Piece cannot be negative"),
  countPackage: z.string().trim(),
  commodity: z.enum(["General", "Hazardous", "ODC"]),
  netWeight: z.number().min(0, "Net Weight cannot be negative"),
  grossWeight: z.number().min(0, "Gross Weight cannot be negative"),
  shippingBill: z.string().trim(),
  cbm: z.number().min(0, "CBM cannot be negative"),
  hbl: z.string().trim(),
});

export const billOfLadingFormSchema = z.object({
  jobNo: z.number().int().min(1, "Job No is required"),
  referenceNo: z.string().trim().min(1, "Reference No is required"),
  status: z.enum(["Draft", "RFS", "SOB"]),
  blNumber: z.string().trim().min(1, "Generate BL Number first"),
});
