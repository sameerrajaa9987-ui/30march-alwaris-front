import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import type { MasterDialogField } from "@/modules/masters/shared/MasterDialog";

export const TARIFF_DESCRIPTION_DIALOG_FIELDS: Array<
  MasterDialogField<TariffDescription, "description">
> = [
  {
    key: "description",
    label: "Tariff Description",
    placeholder: "Enter Tariff Description",
    requiredMessage: "Tariff Description is required",
    getInitialValue: (item) => item.description,
  },
];
