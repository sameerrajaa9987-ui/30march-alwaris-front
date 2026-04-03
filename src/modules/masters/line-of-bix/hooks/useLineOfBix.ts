import {
  listLineOfBix,
  createLineOfBix,
  updateLineOfBix,
  deleteLineOfBix,
} from "@/modules/masters/line-of-bix/api/lineOfBixApi";
import type {
  LineOfBixListQuery,
  LineOfBixListResult,
} from "@/modules/masters/line-of-bix/types";
import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";

const lineOfBixHooks = createMasterHooks<
  LineOfBixListQuery,
  Parameters<typeof createLineOfBix>[0],
  LineOfBixListResult
>("line-of-bix", {
  list: listLineOfBix,
  create: createLineOfBix,
  update: updateLineOfBix,
  remove: deleteLineOfBix,
});

export function useLineOfBix(query: {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}) {
  return lineOfBixHooks.useList(query as LineOfBixListQuery);
}

export function useCreateLineOfBix() {
  return lineOfBixHooks.useCreate();
}

export function useUpdateLineOfBix() {
  return lineOfBixHooks.useUpdate();
}

export function useDeleteLineOfBix() {
  return lineOfBixHooks.useDelete();
}
