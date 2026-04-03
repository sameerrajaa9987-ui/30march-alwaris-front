import { z } from "zod";

export const serviceSchema = z.object({
  serviceType: z.string().trim().min(1, "Service Type is required"),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
