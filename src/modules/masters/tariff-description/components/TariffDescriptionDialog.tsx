import { ResourceDialog } from "@/modules/common/shared-crud/ResourceDialog";
import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import {
  useCreateTariffDescription,
  useUpdateTariffDescription,
} from "@/modules/masters/tariff-description/hooks";
import { TARIFF_DESCRIPTION_DIALOG_FIELDS } from "@/modules/masters/tariff-description/constants/tariffDescriptionDialog.fields";

interface TariffDescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: TariffDescription | null;
  onSuccess?: () => void;
}

export function TariffDescriptionDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: TariffDescriptionDialogProps) {
  return (
    <ResourceDialog<
      TariffDescription,
      Pick<TariffDescription, "description">,
      "description"
    >
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="ADD NEW INCOME HEADER"
      editTitle="Edit Income Header"
      fields={TARIFF_DESCRIPTION_DIALOG_FIELDS}
      toPayload={(values) => ({ description: values.description })}
      useCreate={useCreateTariffDescription}
      useUpdate={useUpdateTariffDescription}
    />
  );
}
