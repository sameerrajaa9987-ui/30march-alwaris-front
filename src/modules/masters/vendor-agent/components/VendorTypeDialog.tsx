import { ResourceDialog } from "@/modules/common/shared-crud/ResourceDialog";
import type { VendorType } from "@/modules/masters/vendor-agent/types";
import {
  useCreateVendorType,
  useUpdateVendorType,
} from "@/modules/masters/vendor-agent/hooks";
import { VENDOR_TYPE_DIALOG_FIELDS } from "@/modules/masters/vendor-agent/constants/vendorTypeDialog.fields";

interface VendorTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: VendorType | null;
  onSuccess?: () => void;
}

export function VendorTypeDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: VendorTypeDialogProps) {
  return (
    <ResourceDialog<VendorType, Pick<VendorType, "vendorType">, "vendorType">
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="Add New Vendor Type"
      editTitle="Edit Vendor Type"
      fields={VENDOR_TYPE_DIALOG_FIELDS}
      toPayload={(values) => ({ vendorType: values.vendorType })}
      useCreate={useCreateVendorType}
      useUpdate={useUpdateVendorType}
    />
  );
}
