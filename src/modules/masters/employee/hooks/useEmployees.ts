import { createResourceHooks } from "@/modules/common/shared-crud/createResourceHooks";
import {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/modules/masters/employee/api/employeeApi";

const employeeCrud = createResourceHooks("employees", {
  list: listEmployees,
  create: createEmployee,
  update: updateEmployee,
  remove: deleteEmployee,
});

export const useEmployees = employeeCrud.useList;
export const useCreateEmployee = employeeCrud.useCreate;
export const useUpdateEmployee = employeeCrud.useUpdate;
export const useDeleteEmployee = employeeCrud.useDelete;
