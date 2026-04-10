import type { CustomerType } from "@/modules/masters/customer/types";
import type { ResourceDialogField } from "@/modules/common/shared-crud/ResourceDialog";

export const CUSTOMER_TYPE_DIALOG_FIELDS: Array<
  ResourceDialogField<CustomerType, "customerType">
> = [
  {
    key: "customerType",
    label: "Customer Type",
    placeholder: "Enter Customer Type",
    requiredMessage: "Customer Type is required",
    getInitialValue: (item) => item.customerType,
  },
];
