import { z } from "zod";

export const termsConditionSchema = z.object({
  lineOfBixId: z.string().trim().min(1, "Line Of BIX is required"),
  description: z.string().trim().min(1, "Terms & Conditions is required"),
});

export type TermsConditionSchema = z.infer<typeof termsConditionSchema>;
