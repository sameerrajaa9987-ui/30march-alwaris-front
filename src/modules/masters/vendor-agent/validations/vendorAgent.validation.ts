import { z } from "zod";

function parseAdditionalEmails(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function isValidEmailList(input: string): boolean {
  const emails = parseAdditionalEmails(input);
  return emails.every((mail) => z.string().email().safeParse(mail).success);
}

export const vendorAgentSchema = z.object({
  vendorTypeId: z.string().trim().min(1, "Vendor Type is required"),
  mail: z.string().trim().optional(),
  vendorName: z.string().trim().min(1, "Vendor Name is required"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  country: z.string().trim().min(1, "Country is required"),
  state: z.string().trim().min(1, "State is required"),
  pincode: z.string().trim().min(1, "Pincode is required"),
  contactPerson: z.string().trim().min(1, "Contact Person is required"),
  contactNo: z.string().trim().min(1, "Contact No is required"),
  emailId: z.string().trim().toLowerCase().email("Invalid Email ID"),
  additionalEmailIds: z
    .string()
    .optional()
    .refine(
      (v) => isValidEmailList(v || ""),
      "Additional emails must be valid (comma-separated)",
    ),
  gstVatNo: z.string().trim().optional(),
  creditDays: z.number().int().min(0, "Credit Days must be 0 or more"),
  stateCode: z.string().trim().optional(),
  panNo: z.string().trim().optional(),
});

export type VendorAgentSchema = z.infer<typeof vendorAgentSchema>;

export { parseAdditionalEmails };
