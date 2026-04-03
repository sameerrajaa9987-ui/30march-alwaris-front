import { createMasterApi } from "@/modules/masters/shared/createMasterApi";
import type {
  Shipment,
  ShipmentListQuery,
  ShipmentListResult,
} from "@/modules/masters/shipment/types";

const shipmentApi = createMasterApi<
  Shipment,
  ShipmentListQuery,
  Pick<Shipment, "shipmentType">
>("/shipments");

export async function listShipments(query: ShipmentListQuery) {
  return shipmentApi.list(query) as Promise<ShipmentListResult>;
}

export async function createShipment(payload: Pick<Shipment, "shipmentType">) {
  return shipmentApi.create(payload);
}

export async function updateShipment(
  id: string,
  payload: Partial<Pick<Shipment, "shipmentType">>,
) {
  return shipmentApi.update(id, payload);
}

export async function deleteShipment(id: string) {
  await shipmentApi.remove(id);
}
