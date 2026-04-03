import { MasterDialog } from "@/modules/masters/shared/MasterDialog";
import type { Terms } from "@/modules/masters/terms/types";
import { useCreateTerms, useUpdateTerms } from "@/modules/masters/terms/hooks";
import { TERMS_DIALOG_FIELDS } from "@/modules/masters/terms/components/termsDialog.fields";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: Terms | null;
  onSuccess?: () => void;
}

export function TermsDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: TermsDialogProps) {
  return (
    <MasterDialog<
      Terms,
      Pick<Terms, "terms" | "description">,
      "terms" | "description"
    >
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="ADD NEW TERMS"
      editTitle="Edit Terms"
      fields={TERMS_DIALOG_FIELDS}
      toPayload={(values) => ({
        terms: values.terms,
        description: values.description,
      })}
      useCreate={useCreateTerms}
      useUpdate={useUpdateTerms}
    />
  );
}
