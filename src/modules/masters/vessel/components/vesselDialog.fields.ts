import type { Vessel } from "@/modules/masters/vessel/types";
import type { MasterDialogField } from "@/modules/masters/shared/MasterDialog";

export const VESSEL_DIALOG_FIELDS: Array<
  MasterDialogField<Vessel, "vesselName">
> = [
  {
    key: "vesselName",
    label: "Vessel Name",
    placeholder: "Enter Vessel Name",
    requiredMessage: "Vessel Name is required",
    getInitialValue: (item) => item.vesselName,
  },
];
