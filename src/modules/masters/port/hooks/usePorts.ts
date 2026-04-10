import {
  listPorts,
  createPort,
  updatePort,
  deletePort,
} from "@/modules/masters/port/api/portApi";
import type {
  PortListQuery,
  PortListResult,
} from "@/modules/masters/port/types";
import { createResourceHooks } from "@/modules/common/shared-crud/createResourceHooks";

const portHooks = createResourceHooks<
  PortListQuery,
  Parameters<typeof createPort>[0],
  PortListResult
>("ports", {
  list: listPorts,
  create: createPort,
  update: updatePort,
  remove: deletePort,
});

export function usePorts(query: {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}) {
  return portHooks.useList(query as PortListQuery);
}

export function useCreatePort() {
  return portHooks.useCreate();
}

export function useUpdatePort() {
  return portHooks.useUpdate();
}

export function useDeletePort() {
  return portHooks.useDelete();
}
