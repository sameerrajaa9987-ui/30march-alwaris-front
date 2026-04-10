import { useMutation, useQuery } from "@tanstack/react-query";
import { createResourceHooks } from "@/modules/common/shared-crud/createResourceHooks";
import {
  createBillOfLading,
  deleteBillOfLading,
  getBillOfLadingJobOptions,
  getNextBlNumber,
  listBillOfLading,
  updateBillOfLading,
} from "@/modules/bill-of-lading/api/billOfLadingApi";
import type {
  BillOfLadingListQuery,
  BillOfLadingListResult,
  BillOfLadingPayload,
  BillOfLadingTableQuery,
} from "@/modules/bill-of-lading/types";

const billOfLadingCrud = createResourceHooks<
  BillOfLadingListQuery,
  BillOfLadingPayload,
  BillOfLadingListResult
>("bill-of-lading", {
  list: listBillOfLading,
  create: createBillOfLading,
  update: updateBillOfLading,
  remove: deleteBillOfLading,
});

export const useBillOfLading = billOfLadingCrud.useList;
export const useCreateBillOfLading = billOfLadingCrud.useCreate;
export const useUpdateBillOfLading = billOfLadingCrud.useUpdate;
export const useDeleteBillOfLading = billOfLadingCrud.useDelete;

export function useBillOfLadingTable(query: BillOfLadingTableQuery) {
  return useBillOfLading(query);
}

export function useGenerateBlNumber() {
  return useMutation({ mutationFn: getNextBlNumber });
}

export function useBillOfLadingJobOptions() {
  return useQuery({
    queryKey: ["bill-of-lading", "job-options"],
    queryFn: getBillOfLadingJobOptions,
    staleTime: 5 * 60 * 1000,
  });
}
