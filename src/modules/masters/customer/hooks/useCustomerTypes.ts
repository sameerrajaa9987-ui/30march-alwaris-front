import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";
import {
  listCustomerTypes,
  createCustomerType,
  updateCustomerType,
  deleteCustomerType,
} from "@/modules/masters/customer/api/customerTypeApi";
import type { CustomerTypeListQuery } from "@/modules/masters/customer/types";

const customerTypeCrud = createMasterHooks<
  CustomerTypeListQuery,
  Parameters<typeof createCustomerType>[0],
  Awaited<ReturnType<typeof listCustomerTypes>>
>("customer-types", {
  list: listCustomerTypes,
  create: createCustomerType,
  update: updateCustomerType,
  remove: deleteCustomerType,
});

export const useCustomerTypes = customerTypeCrud.useList;
export const useCreateCustomerType = customerTypeCrud.useCreate;
export const useUpdateCustomerType = customerTypeCrud.useUpdate;
export const useDeleteCustomerType = customerTypeCrud.useDelete;
