import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  Employee,
  EmployeeListQuery,
  EmployeeListResult,
} from "@/modules/masters/employee/types";

type EmployeeCreatePayload = Omit<
  Employee,
  "id" | "employeeId" | "createdAt" | "updatedAt"
>;

const employeeApi = createResourceApi<
  Employee,
  EmployeeListQuery,
  EmployeeCreatePayload
>("/employees");

export const listEmployees = async (query: EmployeeListQuery) =>
  employeeApi.list(query) satisfies Promise<EmployeeListResult>;

export const createEmployee = (payload: EmployeeCreatePayload) =>
  employeeApi.create(payload);

export const updateEmployee = (
  id: string,
  payload: Partial<EmployeeCreatePayload>,
) => employeeApi.update(id, payload);

export const deleteEmployee = (id: string) => employeeApi.remove(id);
