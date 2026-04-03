import { http } from "@/shared/api/http";
import { createMasterApi } from "@/modules/masters/shared/createMasterApi";
import type {
  Employee,
  EmployeeListQuery,
  EmployeeListResult,
} from "@/modules/masters/employee/types";

type EmployeeCreatePayload = Omit<
  Employee,
  "id" | "employeeId" | "createdAt" | "updatedAt"
>;

const employeeApi = createMasterApi<
  Employee,
  EmployeeListQuery,
  EmployeeCreatePayload
>("/employees");

export const listEmployees = async (query: EmployeeListQuery) =>
  employeeApi.list(query) satisfies Promise<EmployeeListResult>;

export async function getEmployee(id: string) {
  const res = await http.get<{ data: Employee }>(`/employees/${id}`);
  return res.data.data;
}

export const createEmployee = (payload: EmployeeCreatePayload) =>
  employeeApi.create(payload);

export const updateEmployee = (
  id: string,
  payload: Partial<EmployeeCreatePayload>,
) => employeeApi.update(id, payload);

export const deleteEmployee = (id: string) => employeeApi.remove(id);
