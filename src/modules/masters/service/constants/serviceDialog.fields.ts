import type { Service } from "@/modules/masters/service/types";
import type { ResourceDialogField } from "@/modules/common/shared-crud/ResourceDialog";

export const SERVICE_DIALOG_FIELDS: Array<
  ResourceDialogField<Service, "serviceType">
> = [
  {
    key: "serviceType",
    label: "Service Type",
    placeholder: "Enter Service Type",
    requiredMessage: "Service Type is required",
    getInitialValue: (item) => item.serviceType,
  },
];
