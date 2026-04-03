import type { EmployeeDepartment } from "./types";

export const DEPARTMENTS = {
  HOD: "HOD",
  MARKETING: "Marketing",
  ACCOUNTS: "Accounts",
  OTHER: "Other",
} as const;

export const DEPARTMENT_OPTIONS = [
  { value: DEPARTMENTS.HOD, label: "HOD" },
  { value: DEPARTMENTS.MARKETING, label: "Marketing" },
  { value: DEPARTMENTS.ACCOUNTS, label: "Accounts" },
  { value: DEPARTMENTS.OTHER, label: "Other" },
] as const;

export function getDepartmentLabel(value: EmployeeDepartment): string {
  return DEPARTMENT_OPTIONS.find((d) => d.value === value)?.label ?? value;
}

export function isDepartment(
  value: string | null,
): value is EmployeeDepartment {
  return DEPARTMENT_OPTIONS.some((opt) => opt.value === value);
}
