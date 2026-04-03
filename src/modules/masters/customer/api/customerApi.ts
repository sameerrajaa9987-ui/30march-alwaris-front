import { createMasterApi } from "@/modules/masters/shared/createMasterApi";
import type {
  Customer,
  CustomerListQuery,
  CustomerListResult,
} from "@/modules/masters/customer/types";

type CustomerCreatePayload = Omit<
  Customer,
  "id" | "code" | "customerType" | "createdAt" | "updatedAt"
>;

const customerApi = createMasterApi<
  Customer,
  CustomerListQuery,
  CustomerCreatePayload
>("/customers");

export const listCustomers = async (query: CustomerListQuery) =>
  customerApi.list(query) satisfies Promise<CustomerListResult>;
export const createCustomer = (payload: CustomerCreatePayload) =>
  customerApi.create(payload);
export const updateCustomer = (
  id: string,
  payload: Partial<CustomerCreatePayload>,
) => customerApi.update(id, payload);
export const deleteCustomer = (id: string) => customerApi.remove(id);
