import { createResourceHooks } from "@/modules/common/shared-crud/createResourceHooks";
import {
  listVendorTypes,
  createVendorType,
  updateVendorType,
  deleteVendorType,
} from "@/modules/masters/vendor-agent/api/vendorTypeApi";
import type { VendorTypeListQuery } from "@/modules/masters/vendor-agent/types";

const vendorTypeCrud = createResourceHooks<
  VendorTypeListQuery,
  Parameters<typeof createVendorType>[0],
  Awaited<ReturnType<typeof listVendorTypes>>
>("vendor-types", {
  list: listVendorTypes,
  create: createVendorType,
  update: updateVendorType,
  remove: deleteVendorType,
});

export const useVendorTypes = vendorTypeCrud.useList;
export const useCreateVendorType = vendorTypeCrud.useCreate;
export const useUpdateVendorType = vendorTypeCrud.useUpdate;
export const useDeleteVendorType = vendorTypeCrud.useDelete;
