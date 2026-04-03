import {
  listTermsConditions,
  createTermsCondition,
  updateTermsCondition,
  deleteTermsCondition,
} from "@/modules/masters/terms-condition/api/termsConditionApi";
import type {
  TermsConditionListQuery,
  TermsConditionListResult,
} from "@/modules/masters/terms-condition/types";
import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";

const termsConditionHooks = createMasterHooks<
  TermsConditionListQuery,
  Parameters<typeof createTermsCondition>[0],
  TermsConditionListResult
>("terms-conditions", {
  list: listTermsConditions,
  create: createTermsCondition,
  update: updateTermsCondition,
  remove: deleteTermsCondition,
});

export function useTermsConditions(query: {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}) {
  return termsConditionHooks.useList(query as TermsConditionListQuery);
}

export function useCreateTermsCondition() {
  return termsConditionHooks.useCreate();
}

export function useUpdateTermsCondition() {
  return termsConditionHooks.useUpdate();
}

export function useDeleteTermsCondition() {
  return termsConditionHooks.useDelete();
}
