import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import type { ResourceDialogField } from "@/modules/common/shared-crud/ResourceDialog";

export const TARIFF_DESCRIPTION_DIALOG_FIELDS: Array<
  ResourceDialogField<TariffDescription, "description">
> = [
  {
    key: "description",
    label: "Tariff Description",
    placeholder: "Enter Tariff Description",
    requiredMessage: "Tariff Description is required",
    getInitialValue: (item) => item.description,
  },
];
