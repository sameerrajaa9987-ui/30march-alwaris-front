import { z } from "zod";

export const termsSchema = z.object({
  terms: z.string().trim().min(1, "Terms is required"),
  description: z.string().trim().min(1, "Description is required"),
});

export type TermsSchema = z.infer<typeof termsSchema>;
