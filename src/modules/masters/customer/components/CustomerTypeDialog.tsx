import { MasterDialog } from "@/modules/masters/shared/MasterDialog";
import type { CustomerType } from "@/modules/masters/customer/types";
import {
  useCreateCustomerType,
  useUpdateCustomerType,
} from "@/modules/masters/customer/hooks";
import { CUSTOMER_TYPE_DIALOG_FIELDS } from "@/modules/masters/customer/components/customerTypeDialog.fields";

interface CustomerTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: CustomerType | null;
  onSuccess?: () => void;
}

export function CustomerTypeDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: CustomerTypeDialogProps) {
  return (
    <MasterDialog<
      CustomerType,
      Pick<CustomerType, "customerType">,
      "customerType"
    >
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="Add New Customer Type"
      editTitle="Edit Customer Type"
      fields={CUSTOMER_TYPE_DIALOG_FIELDS}
      toPayload={(values) => ({ customerType: values.customerType })}
      useCreate={useCreateCustomerType}
      useUpdate={useUpdateCustomerType}
    />
  );
}
