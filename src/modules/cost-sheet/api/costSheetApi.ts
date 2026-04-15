import { http } from "@/shared/api/http";
import type {
  CostSheetBookingSnapshot,
  CostSheetJobOption,
  CostSheetListQuery,
  CostSheetListResult,
  CostSheetPayload,
} from "@/modules/cost-sheet/types";

export async function getCostSheetJobOptions() {
  const res = await http.get<{ data: CostSheetJobOption[] }>(
    "/cost-sheets/job-options",
  );
  return res.data.data;
}

export async function getCostSheetBookingByJobNo(jobNo: number) {
  const res = await http.get<{ data: CostSheetBookingSnapshot }>(
    `/cost-sheets/booking/${jobNo}`,
  );
  return res.data.data;
}

export async function createCostSheet(payload: CostSheetPayload) {
  const res = await http.post<{ data: { id: string } }>(
    "/cost-sheets",
    payload,
  );
  return res.data.data;
}

type ListResponse<TItem> = {
  data: TItem[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};

export async function listCostSheets(query: CostSheetListQuery) {
  const res = await http.get<
    ListResponse<CostSheetListResult["items"][number]>
  >("/cost-sheets", { params: query });

  return {
    items: res.data.data,
    meta: res.data.meta,
  } satisfies CostSheetListResult;
}
