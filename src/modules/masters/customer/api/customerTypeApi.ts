import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  CustomerType,
  CustomerTypeListQuery,
  CustomerTypeListResult,
} from "@/modules/masters/customer/types";

type CustomerTypePayload = Pick<CustomerType, "customerType">;

const customerTypeApi = createResourceApi<
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
