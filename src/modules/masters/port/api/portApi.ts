import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  Port,
  PortListQuery,
  PortListResult,
} from "@/modules/masters/port/types";

const portApi = createResourceApi<
  Port,
  PortListQuery,
  Pick<Port, "portCode" | "portName">
>("/ports");

export async function listPorts(query: PortListQuery) {
  return portApi.list(query) as Promise<PortListResult>;
}

export async function createPort(payload: Pick<Port, "portCode" | "portName">) {
  return portApi.create(payload);
}

export async function updatePort(
  id: string,
  payload: Partial<Pick<Port, "portCode" | "portName">>,
) {
  return portApi.update(id, payload);
}

export async function deletePort(id: string) {
  await portApi.remove(id);
}
