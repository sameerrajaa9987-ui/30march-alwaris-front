export type EmployeeDepartment = "HOD" | "Marketing" | "Accounts" | "Other";

export type Employee = {
  id: string;
  employeeId: string;
  isActive: boolean;
  isApproved: boolean;
  employeeName: string;
  department: EmployeeDepartment;
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  contactNo: string;
  emailId: string;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeListQuery = {
  search?: string;
  department?: EmployeeDepartment;
  isActive?: boolean;
  isApproved?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "employeeId" | "employeeName";
  sortDir?: "asc" | "desc";
};

export type EmployeeListResult = {
  items: Employee[];
  total: number;
};
