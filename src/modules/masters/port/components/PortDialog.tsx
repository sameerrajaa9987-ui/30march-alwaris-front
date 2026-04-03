import { MasterDialog } from "@/modules/masters/shared/MasterDialog";
import type { Port } from "@/modules/masters/port/types";
import { useCreatePort, useUpdatePort } from "@/modules/masters/port/hooks";
import { PORT_DIALOG_FIELDS } from "@/modules/masters/port/components/portDialog.fields";

interface PortDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: Port | null;
  onSuccess?: () => void;
}

export function PortDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: PortDialogProps) {
  return (
    <MasterDialog<
      Port,
      Pick<Port, "portCode" | "portName">,
      "portCode" | "portName"
    >
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="ADD NEW PORT"
      editTitle="Edit Port"
      fields={PORT_DIALOG_FIELDS}
      toPayload={(values) => ({
        portCode: values.portCode,
        portName: values.portName,
      })}
      useCreate={useCreatePort}
      useUpdate={useUpdatePort}
    />
  );
}
