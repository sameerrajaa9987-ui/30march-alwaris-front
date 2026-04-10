import {
  listShipments,
  createShipment,
  updateShipment,
  deleteShipment,
} from "@/modules/masters/shipment/api/shipmentApi";
import type { ShipmentListQuery } from "@/modules/masters/shipment/types";
import { createResourceHooks } from "@/modules/common/shared-crud/createResourceHooks";

const shipmentHooks = createResourceHooks("shipments", {
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
