import {
  listTariffDescriptions,
  createTariffDescription,
  updateTariffDescription,
  deleteTariffDescription,
} from "@/modules/masters/tariff-description/api/tariffDescriptionApi";
import type { TariffDescriptionListQuery } from "@/modules/masters/tariff-description/types";
import { createMasterHooks } from "@/modules/masters/shared/createMasterHooks";

const tariffDescriptionHooks = createMasterHooks("tariff-descriptions", {
  list: listTariffDescriptions,
  create: createTariffDescription,
  update: updateTariffDescription,
  remove: deleteTariffDescription,
});

export function useTariffDescriptions(query: {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}) {
  return tariffDescriptionHooks.useList(query as TariffDescriptionListQuery);
}

export function useCreateTariffDescription() {
  return tariffDescriptionHooks.useCreate();
}

export function useUpdateTariffDescription() {
  return tariffDescriptionHooks.useUpdate();
}

export function useDeleteTariffDescription() {
  return tariffDescriptionHooks.useDelete();
}
