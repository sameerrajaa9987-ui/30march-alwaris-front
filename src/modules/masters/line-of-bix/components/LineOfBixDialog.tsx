import { ResourceDialog } from "@/modules/common/shared-crud/ResourceDialog";
import type { LineOfBix } from "@/modules/masters/line-of-bix/types";
import {
  useCreateLineOfBix,
  useUpdateLineOfBix,
} from "@/modules/masters/line-of-bix/hooks";
import { LINE_OF_BIX_DIALOG_FIELDS } from "@/modules/masters/line-of-bix/constants/lineOfBixDialog.fields";

interface LineOfBixDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: LineOfBix | null;
  onSuccess?: () => void;
}

export function LineOfBixDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: LineOfBixDialogProps) {
  return (
    <ResourceDialog<
      LineOfBix,
      Pick<LineOfBix, "code" | "lineOfBix">,
      "code" | "lineOfBix"
    >
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="ADD NEW LINE OF BIX"
      editTitle="Edit Line Of BIX"
      fields={LINE_OF_BIX_DIALOG_FIELDS}
      toPayload={(values) => ({
        code: values.code,
        lineOfBix: values.lineOfBix,
      })}
      useCreate={useCreateLineOfBix}
      useUpdate={useUpdateLineOfBix}
    />
  );
}
