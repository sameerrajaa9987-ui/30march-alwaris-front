import type { ResourceDialogField } from "@/modules/common/shared-crud/ResourceDialog";
import type { VendorType } from "@/modules/masters/vendor-agent/types";

export const VENDOR_TYPE_DIALOG_FIELDS: Array<
  ResourceDialogField<VendorType, "vendorType">
> = [
  {
    key: "vendorType",
    label: "Vendor Type",
    placeholder: "Enter Vendor Type",
    requiredMessage: "Vendor Type is required",
    getInitialValue: (item) => item.vendorType,
  },
];
