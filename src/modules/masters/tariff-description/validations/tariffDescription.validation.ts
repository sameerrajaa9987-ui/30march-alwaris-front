import { z } from "zod";

export const tariffDescriptionSchema = z.object({
  description: z.string().trim().min(1, "Tariff Description is required"),
});

export type TariffDescriptionSchema = z.infer<typeof tariffDescriptionSchema>;
