import type { Terms } from "@/modules/masters/terms/types";
import type { MasterDialogField } from "@/modules/masters/shared/MasterDialog";

export const TERMS_DIALOG_FIELDS: Array<
  MasterDialogField<Terms, "terms" | "description">
> = [
  {
    key: "terms",
    label: "Terms",
    placeholder: "Enter Terms",
    requiredMessage: "Terms is required",
    getInitialValue: (item) => item.terms,
  },
  {
    key: "description",
    label: "Description",
    placeholder: "Enter Description",
    requiredMessage: "Description is required",
    getInitialValue: (item) => item.description,
  },
];
