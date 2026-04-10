import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  VendorType,
  VendorTypeListQuery,
  VendorTypeListResult,
} from "@/modules/masters/vendor-agent/types";

type VendorTypePayload = Pick<VendorType, "vendorType">;

const vendorTypeApi = createResourceApi<
  VendorType,
  VendorTypeListQuery,
  VendorTypePayload
>("/vendor-types");

export const listVendorTypes = async (query: VendorTypeListQuery) =>
  vendorTypeApi.list(query) satisfies Promise<VendorTypeListResult>;
export const createVendorType = (payload: VendorTypePayload) =>
  vendorTypeApi.create(payload);
export const updateVendorType = (
  id: string,
  payload: Partial<VendorTypePayload>,
) => vendorTypeApi.update(id, payload);
export const deleteVendorType = (id: string) => vendorTypeApi.remove(id);
