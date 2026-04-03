import {
  listTerms,
  createTerms,
  updateTerms,
  deleteTerms,
} from "@/modules/masters/terms/api/termsApi";
import type {
  TermsListQuery,
  TermsListResult,
} from "@/modules/masters/terms/types";
import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";

const termsHooks = createMasterHooks<
  TermsListQuery,
  Parameters<typeof createTerms>[0],
  TermsListResult
>("terms", {
  list: listTerms,
  create: createTerms,
  update: updateTerms,
  remove: deleteTerms,
});

export function useTerms(query: {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}) {
  return termsHooks.useList(query as TermsListQuery);
}

export function useCreateTerms() {
  return termsHooks.useCreate();
}

export function useUpdateTerms() {
  return termsHooks.useUpdate();
}

export function useDeleteTerms() {
  return termsHooks.useDelete();
}
