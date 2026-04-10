import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  VendorAgent,
  VendorAgentListQuery,
  VendorAgentListResult,
} from "@/modules/masters/vendor-agent/types";

type VendorAgentCreatePayload = Omit<
  VendorAgent,
  "id" | "code" | "vendorType" | "createdAt" | "updatedAt"
>;

const vendorAgentApi = createResourceApi<
  VendorAgent,
  VendorAgentListQuery,
  VendorAgentCreatePayload
>("/vendor-agents");

export const listVendorAgents = async (query: VendorAgentListQuery) =>
  vendorAgentApi.list(query) satisfies Promise<VendorAgentListResult>;
export const createVendorAgent = (payload: VendorAgentCreatePayload) =>
  vendorAgentApi.create(payload);
export const updateVendorAgent = (
  id: string,
  payload: Partial<VendorAgentCreatePayload>,
) => vendorAgentApi.update(id, payload);
export const deleteVendorAgent = (id: string) => vendorAgentApi.remove(id);
