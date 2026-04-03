import { z } from "zod";

export const lineOfBixSchema = z.object({
  code: z.string().trim().min(1, "Code is required"),
  lineOfBix: z.string().trim().min(1, "Line Of BIX is required"),
});

export type LineOfBixSchema = z.infer<typeof lineOfBixSchema>;
