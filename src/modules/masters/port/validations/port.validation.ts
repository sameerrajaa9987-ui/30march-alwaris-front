import { z } from "zod";

export const portSchema = z.object({
  portCode: z.string().trim().min(1, "Port Code is required"),
  portName: z.string().trim().min(1, "Port Name is required"),
});

export type PortSchema = z.infer<typeof portSchema>;
