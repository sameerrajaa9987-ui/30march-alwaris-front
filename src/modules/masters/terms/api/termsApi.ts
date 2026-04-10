import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import type {
  Terms,
  TermsListQuery,
  TermsListResult,
} from "@/modules/masters/terms/types";

const termsApi = createResourceApi<
  Terms,
  TermsListQuery,
  Pick<Terms, "terms" | "description">
>("/terms");

export async function listTerms(query: TermsListQuery) {
  return termsApi.list(query) as Promise<TermsListResult>;
}

export async function createTerms(
  payload: Pick<Terms, "terms" | "description">,
) {
  return termsApi.create(payload);
}

export async function updateTerms(
  id: string,
  payload: Partial<Pick<Terms, "terms" | "description">>,
) {
  return termsApi.update(id, payload);
}

export async function deleteTerms(id: string) {
  await termsApi.remove(id);
}
