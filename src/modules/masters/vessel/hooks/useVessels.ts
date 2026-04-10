import {
  listVessels,
  createVessel,
  updateVessel,
  deleteVessel,
} from "@/modules/masters/vessel/api/vesselApi";
import type { VesselListQuery } from "@/modules/masters/vessel/types";
import { createResourceHooks } from "@/modules/common/shared-crud/createResourceHooks";

const vesselHooks = createResourceHooks("vessels", {
  list: listVessels,
  create: createVessel,
  update: updateVessel,
  remove: deleteVessel,
});

export function useVessels(query: {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}) {
  return vesselHooks.useList(query as VesselListQuery);
}

export function useCreateVessel() {
  return vesselHooks.useCreate();
}

export function useUpdateVessel() {
  return vesselHooks.useUpdate();
}

export function useDeleteVessel() {
  return vesselHooks.useDelete();
}
