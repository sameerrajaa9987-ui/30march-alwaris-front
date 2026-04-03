import type { Port } from "@/modules/masters/port/types";
import type { MasterDialogField } from "@/modules/masters/shared/MasterDialog";

export const PORT_DIALOG_FIELDS: Array<
  MasterDialogField<Port, "portCode" | "portName">
> = [
  {
    key: "portCode",
    label: "Port Code",
    placeholder: "Enter Port Code",
    requiredMessage: "Port Code is required",
    getInitialValue: (item) => item.portCode,
  },
  {
    key: "portName",
    label: "Port Name",
    placeholder: "Enter Port Name",
    requiredMessage: "Port Name is required",
    getInitialValue: (item) => item.portName,
  },
];
