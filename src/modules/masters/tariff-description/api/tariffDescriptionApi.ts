import { createMasterApi } from "@/modules/masters/shared/createMasterApi";
import type {
  TariffDescription,
  TariffDescriptionListQuery,
  TariffDescriptionListResult,
} from "@/modules/masters/tariff-description/types";

const tariffDescriptionApi = createMasterApi<
  TariffDescription,
  TariffDescriptionListQuery,
  Pick<TariffDescription, "description">
>("/tariff-descriptions");

export async function listTariffDescriptions(
  query: TariffDescriptionListQuery,
) {
  return tariffDescriptionApi.list(
    query,
  ) as Promise<TariffDescriptionListResult>;
}

export async function createTariffDescription(
  payload: Pick<TariffDescription, "description">,
) {
  return tariffDescriptionApi.create(payload);
}

export async function updateTariffDescription(
  id: string,
  payload: Partial<Pick<TariffDescription, "description">>,
) {
  return tariffDescriptionApi.update(id, payload);
}

export async function deleteTariffDescription(id: string) {
  await tariffDescriptionApi.remove(id);
}
