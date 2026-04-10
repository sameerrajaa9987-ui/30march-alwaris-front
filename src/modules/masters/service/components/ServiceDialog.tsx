import { ResourceDialog } from "@/modules/common/shared-crud/ResourceDialog";
import type { Service } from "@/modules/masters/service/types";
import {
  useCreateService,
  useUpdateService,
} from "@/modules/masters/service/hooks";
import { SERVICE_DIALOG_FIELDS } from "@/modules/masters/service/constants/serviceDialog.fields";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: Service | null;
  onSuccess?: () => void;
}

export function ServiceDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: ServiceDialogProps) {
  return (
    <ResourceDialog<Service, Pick<Service, "serviceType">, "serviceType">
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="ADD NEW SERVICE TYPE"
      editTitle="Edit Service Type"
      fields={SERVICE_DIALOG_FIELDS}
      toPayload={(values) => ({ serviceType: values.serviceType })}
      useCreate={useCreateService}
      useUpdate={useUpdateService}
    />
  );
}
