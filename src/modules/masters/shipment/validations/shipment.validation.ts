import { z } from "zod";

export const shipmentSchema = z.object({
  shipmentType: z.string().trim().min(1, "Shipment Type is required"),
});

export type ShipmentSchema = z.infer<typeof shipmentSchema>;
