import type { Service } from "@/modules/masters/service/types";
import type { MasterDialogField } from "@/modules/masters/shared/MasterDialog";

export const SERVICE_DIALOG_FIELDS: Array<
  MasterDialogField<Service, "serviceType">
> = [
  {
    key: "serviceType",
    label: "Service Type",
    placeholder: "Enter Service Type",
    requiredMessage: "Service Type is required",
    getInitialValue: (item) => item.serviceType,
  },
];
