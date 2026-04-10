import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  TermsCondition,
  TermsConditionListQuery,
  TermsConditionListResult,
} from "@/modules/masters/terms-condition/types";

const termsConditionApi = createResourceApi<
  TermsCondition,
  TermsConditionListQuery,
  Pick<TermsCondition, "lineOfBixId" | "description">
>("/terms-conditions");

export async function listTermsConditions(query: TermsConditionListQuery) {
  return termsConditionApi.list(query) as Promise<TermsConditionListResult>;
}

export async function createTermsCondition(
  payload: Pick<TermsCondition, "lineOfBixId" | "description">,
) {
  return termsConditionApi.create(payload);
}

export async function updateTermsCondition(
  id: string,
  payload: Partial<Pick<TermsCondition, "lineOfBixId" | "description">>,
) {
  return termsConditionApi.update(id, payload);
}

export async function deleteTermsCondition(id: string) {
  await termsConditionApi.remove(id);
}
