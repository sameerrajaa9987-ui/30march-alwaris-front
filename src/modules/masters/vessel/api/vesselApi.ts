import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  Vessel,
  VesselListQuery,
  VesselListResult,
} from "@/modules/masters/vessel/types";

const vesselApi = createResourceApi<
  Vessel,
  VesselListQuery,
  Pick<Vessel, "vesselName">
>("/vessels");

export async function listVessels(query: VesselListQuery) {
  return vesselApi.list(query) as Promise<VesselListResult>;
}

export async function createVessel(payload: Pick<Vessel, "vesselName">) {
  return vesselApi.create(payload);
}

export async function updateVessel(
  id: string,
  payload: Partial<Pick<Vessel, "vesselName">>,
) {
  return vesselApi.update(id, payload);
}

export async function deleteVessel(id: string) {
  await vesselApi.remove(id);
}
