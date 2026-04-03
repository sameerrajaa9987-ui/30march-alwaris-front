import { useQuery } from "@tanstack/react-query";
import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";
import {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} from "@/modules/masters/employee/api/employeeApi";

const employeeCrud = createMasterHooks("employees", {
  list: listEmployees,
  create: createEmployee,
  update: updateEmployee,
  remove: deleteEmployee,
});

const EMPLOYEE_DETAIL_KEYS = {
  all: ["employees", "detail"] as const,
  detail: (id: string) => [...EMPLOYEE_DETAIL_KEYS.all, id] as const,
};

export const useEmployees = employeeCrud.useList;
export const useCreateEmployee = employeeCrud.useCreate;
export const useUpdateEmployee = employeeCrud.useUpdate;
export const useDeleteEmployee = employeeCrud.useDelete;

export function useEmployee(id: string | undefined) {
  return useQuery({
    queryKey: EMPLOYEE_DETAIL_KEYS.detail(id || ""),
    queryFn: () => getEmployee(id || ""),
    enabled: !!id,
  });
}
