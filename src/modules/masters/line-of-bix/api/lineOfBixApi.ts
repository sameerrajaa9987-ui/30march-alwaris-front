import { createMasterApi } from "@/modules/masters/shared/createMasterApi";
import type {
  LineOfBix,
  LineOfBixListQuery,
  LineOfBixListResult,
} from "@/modules/masters/line-of-bix/types";

const lineOfBixApi = createMasterApi<
  LineOfBix,
  LineOfBixListQuery,
  Pick<LineOfBix, "code" | "lineOfBix">
>("/line-of-bix");

export async function listLineOfBix(query: LineOfBixListQuery) {
  return lineOfBixApi.list(query) as Promise<LineOfBixListResult>;
}

export async function createLineOfBix(
  payload: Pick<LineOfBix, "code" | "lineOfBix">,
) {
  return lineOfBixApi.create(payload);
}

export async function updateLineOfBix(
  id: string,
  payload: Partial<Pick<LineOfBix, "code" | "lineOfBix">>,
) {
  return lineOfBixApi.update(id, payload);
}

export async function deleteLineOfBix(id: string) {
  await lineOfBixApi.remove(id);
}
