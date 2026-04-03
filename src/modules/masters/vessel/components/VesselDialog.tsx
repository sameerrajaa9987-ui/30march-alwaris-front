import { MasterDialog } from "@/modules/masters/shared/MasterDialog";
import type { Vessel } from "@/modules/masters/vessel/types";
import {
  useCreateVessel,
  useUpdateVessel,
} from "@/modules/masters/vessel/hooks";
import { VESSEL_DIALOG_FIELDS } from "@/modules/masters/vessel/components/vesselDialog.fields";

interface VesselDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: Vessel | null;
  onSuccess?: () => void;
}

export function VesselDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: VesselDialogProps) {
  return (
    <MasterDialog<Vessel, Pick<Vessel, "vesselName">, "vesselName">
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="ADD NEW VESSEL NAME"
      editTitle="Edit Vessel Name"
      fields={VESSEL_DIALOG_FIELDS}
      toPayload={(values) => ({ vesselName: values.vesselName })}
      useCreate={useCreateVessel}
      useUpdate={useUpdateVessel}
    />
  );
}
