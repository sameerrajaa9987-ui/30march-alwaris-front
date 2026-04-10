import { z } from "zod";

export const vendorTypeSchema = z.object({
  vendorType: z.string().trim().min(1, "Vendor Type is required"),
});

export type VendorTypeSchema = z.infer<typeof vendorTypeSchema>;
