import {
  listServices,
  createService,
  updateService,
  deleteService,
} from "@/modules/masters/service/api/serviceApi";
import type { ServiceListQuery } from "@/modules/masters/service/types";
import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";

const serviceHooks = createMasterHooks("services", {
  list: listServices,
  create: createService,
  update: updateService,
  remove: deleteService,
});

export function useServices(query: {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}) {
  return serviceHooks.useList(query as ServiceListQuery);
}

export function useCreateService() {
  return serviceHooks.useCreate();
}

export function useUpdateService() {
  return serviceHooks.useUpdate();
}

export function useDeleteService() {
  return serviceHooks.useDelete();
}
