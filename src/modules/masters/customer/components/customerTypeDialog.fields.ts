import type { CustomerType } from "@/modules/masters/customer/types";
import type { MasterDialogField } from "@/modules/masters/shared/MasterDialog";

export const CUSTOMER_TYPE_DIALOG_FIELDS: Array<
  MasterDialogField<CustomerType, "customerType">
> = [
  {
    key: "customerType",
    label: "Customer Type",
    placeholder: "Enter Customer Type",
    requiredMessage: "Customer Type is required",
    getInitialValue: (item) => item.customerType,
  },
];
