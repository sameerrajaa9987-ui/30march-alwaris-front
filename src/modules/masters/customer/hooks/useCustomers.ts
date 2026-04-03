import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";
import {
  listCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/modules/masters/customer/api/customerApi";
import type { CustomerListQuery } from "@/modules/masters/customer/types";

const customerCrud = createMasterHooks<
  CustomerListQuery,
  Parameters<typeof createCustomer>[0],
  Awaited<ReturnType<typeof listCustomers>>
>("customers", {
  list: listCustomers,
  create: createCustomer,
  update: updateCustomer,
  remove: deleteCustomer,
});

export const useCustomers = customerCrud.useList;
export const useCreateCustomer = customerCrud.useCreate;
export const useUpdateCustomer = customerCrud.useUpdate;
export const useDeleteCustomer = customerCrud.useDelete;
