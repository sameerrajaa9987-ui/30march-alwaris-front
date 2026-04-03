import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";
import {
  listVendorAgents,
  createVendorAgent,
  updateVendorAgent,
  deleteVendorAgent,
} from "@/modules/masters/vendor-agent/api/vendorAgentApi";
import type { VendorAgentListQuery } from "@/modules/masters/vendor-agent/types";

const vendorAgentCrud = createMasterHooks<
  VendorAgentListQuery,
  Parameters<typeof createVendorAgent>[0],
  Awaited<ReturnType<typeof listVendorAgents>>
>("vendor-agents", {
  list: listVendorAgents,
  create: createVendorAgent,
  update: updateVendorAgent,
  remove: deleteVendorAgent,
});

export const useVendorAgents = vendorAgentCrud.useList;
export const useCreateVendorAgent = vendorAgentCrud.useCreate;
export const useUpdateVendorAgent = vendorAgentCrud.useUpdate;
export const useDeleteVendorAgent = vendorAgentCrud.useDelete;
