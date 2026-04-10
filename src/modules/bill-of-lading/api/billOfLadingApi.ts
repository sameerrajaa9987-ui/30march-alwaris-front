import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import { http } from "@/shared/api/http";
import type {
  BillOfLading,
  BillOfLadingJobOption,
  BillOfLadingListQuery,
  BillOfLadingListResult,
  BillOfLadingPayload,
} from "@/modules/bill-of-lading/types";

const billOfLadingApi = createResourceApi<
  BillOfLading,
  BillOfLadingListQuery,
  BillOfLadingPayload
>("/bill-of-lading");

export const listBillOfLading = async (query: BillOfLadingListQuery) =>
  billOfLadingApi.list(query) satisfies Promise<BillOfLadingListResult>;

export const createBillOfLading = (payload: BillOfLadingPayload) =>
  billOfLadingApi.create(payload);

export const updateBillOfLading = (
  id: string,
  payload: Partial<BillOfLadingPayload>,
) => billOfLadingApi.update(id, payload);

export const deleteBillOfLading = (id: string) => billOfLadingApi.remove(id);

export async function getNextBlNumber() {
  const res = await http.get<{ data: { blNumber: string } }>(
    "/bill-of-lading/next-bl-number",
  );
  return res.data.data.blNumber;
}

export async function getBillOfLadingJobOptions() {
  const res = await http.get<{ data: BillOfLadingJobOption[] }>(
    "/bill-of-lading/job-options",
  );
  return res.data.data;
}
