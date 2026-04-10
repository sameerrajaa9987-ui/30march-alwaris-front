import type { LineOfBix } from "@/modules/masters/line-of-bix/types";
import type { ResourceDialogField } from "@/modules/common/shared-crud/ResourceDialog";

export const LINE_OF_BIX_DIALOG_FIELDS: Array<
  ResourceDialogField<LineOfBix, "code" | "lineOfBix">
> = [
  {
    key: "code",
    label: "Code",
    placeholder: "Enter Code",
    requiredMessage: "Code is required",
    getInitialValue: (item) => item.code,
  },
  {
    key: "lineOfBix",
    label: "Line Of BIX",
    placeholder: "Enter Line Of BIX",
    requiredMessage: "Line Of BIX is required",
    getInitialValue: (item) => item.lineOfBix,
  },
];
