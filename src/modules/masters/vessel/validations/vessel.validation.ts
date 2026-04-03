import { z } from "zod";

export const vesselSchema = z.object({
  vesselName: z.string().trim().min(1, "Vessel Name is required"),
});

export type VesselSchema = z.infer<typeof vesselSchema>;
