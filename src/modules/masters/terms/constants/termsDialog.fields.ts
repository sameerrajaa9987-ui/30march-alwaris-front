import type { Terms } from "@/modules/masters/terms/types";
import type { ResourceDialogField } from "@/modules/common/shared-crud/ResourceDialog";

export const TERMS_DIALOG_FIELDS: Array<
  ResourceDialogField<Terms, "terms" | "description">
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
