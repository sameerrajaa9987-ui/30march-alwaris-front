import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  Service,
  ServiceListQuery,
  ServiceListResult,
} from "@/modules/masters/service/types";

const serviceApi = createResourceApi<
  Service,
  ServiceListQuery,
  Pick<Service, "serviceType">
>("/services");

export async function listServices(query: ServiceListQuery) {
  return serviceApi.list(query) as Promise<ServiceListResult>;
}

export async function createService(payload: Pick<Service, "serviceType">) {
  return serviceApi.create(payload);
}

export async function updateService(
  id: string,
  payload: Partial<Pick<Service, "serviceType">>,
) {
  return serviceApi.update(id, payload);
}

export async function deleteService(id: string) {
  await serviceApi.remove(id);
}
