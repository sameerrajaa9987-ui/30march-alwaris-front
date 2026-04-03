import { z } from "zod";
import { DEPARTMENTS } from "../constants";

export const employeeSchema = z.object({
  isActive: z.boolean(),
  isApproved: z.boolean(),
  employeeName: z.string().trim().min(1, "Employee Name is required"),
  department: z.enum([
    DEPARTMENTS.HOD,
    DEPARTMENTS.MARKETING,
    DEPARTMENTS.ACCOUNTS,
    DEPARTMENTS.OTHER,
  ]),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  pincode: z.string().trim().min(1, "Pincode is required"),
  state: z.string().trim().min(1, "State is required"),
  country: z.string().trim().min(1, "Country is required"),
  contactNo: z.string().trim().min(1, "Contact No is required"),
  emailId: z.string().trim().toLowerCase().email("Invalid Email ID"),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;

export const employeeCreateSchema = employeeSchema;

export const employeeUpdateSchema = employeeSchema.partial();
