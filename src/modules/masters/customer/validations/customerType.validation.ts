import { z } from "zod";

export const customerTypeSchema = z.object({
  customerType: z.string().trim().min(1, "Customer Type is required"),
});

export type CustomerTypeSchema = z.infer<typeof customerTypeSchema>;
