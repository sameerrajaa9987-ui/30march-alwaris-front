import {
  listShipments,
  createShipment,
  updateShipment,
  deleteShipment,
} from "@/modules/masters/shipment/api/shipmentApi";
import type { ShipmentListQuery } from "@/modules/masters/shipment/types";
import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";

const shipmentHooks = createMasterHooks("shipments", {
  list: listShipments,
  create: createShipment,
  update: updateShipment,
  remove: deleteShipment,
});

export function useShipments(query: {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}) {
  return shipmentHooks.useList(query as ShipmentListQuery);
}

export function useCreateShipment() {
  return shipmentHooks.useCreate();
}

export function useUpdateShipment() {
  return shipmentHooks.useUpdate();
}

export function useDeleteShipment() {
  return shipmentHooks.useDelete();
}
