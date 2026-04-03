import { createMasterApi } from "@/modules/masters/shared/createMasterApi";
import type {
  CustomerType,
  CustomerTypeListQuery,
  CustomerTypeListResult,
} from "@/modules/masters/customer/types";

type CustomerTypePayload = Pick<CustomerType, "customerType">;

const customerTypeApi = createMasterApi<
  CustomerType,
  CustomerTypeListQuery,
  CustomerTypePayload
>("/customer-types");

export const listCustomerTypes = async (query: CustomerTypeListQuery) =>
  customerTypeApi.list(query) satisfies Promise<CustomerTypeListResult>;
export const createCustomerType = (payload: CustomerTypePayload) =>
  customerTypeApi.create(payload);
export const updateCustomerType = (
  id: string,
  payload: Partial<CustomerTypePayload>,
) => customerTypeApi.update(id, payload);
export const deleteCustomerType = (id: string) => customerTypeApi.remove(id);
