import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCostSheet,
  getCostSheetBookingByJobNo,
  getCostSheetJobOptions,
  listCostSheets,
} from "@/modules/cost-sheet/api/costSheetApi";
import type {
  CostSheetListQuery,
  CostSheetPayload,
} from "@/modules/cost-sheet/types";

export function useCostSheetJobOptions() {
  return useQuery({
    queryKey: ["cost-sheets", "job-options"],
    queryFn: getCostSheetJobOptions,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCostSheetBookingDetails(jobNo: number | null) {
  return useQuery({
    queryKey: ["cost-sheets", "booking", jobNo],
    queryFn: () => getCostSheetBookingByJobNo(Number(jobNo)),
    enabled: Number.isFinite(jobNo) && Number(jobNo) > 0,
  });
}

export function useCreateCostSheet() {
  return useMutation({
    mutationFn: (payload: CostSheetPayload) => createCostSheet(payload),
  });
}

export function useCostSheetApprovalList(query: CostSheetListQuery) {
  return useQuery({
    queryKey: ["cost-sheets", "approval", query],
    queryFn: () => listCostSheets(query),
  });
}
