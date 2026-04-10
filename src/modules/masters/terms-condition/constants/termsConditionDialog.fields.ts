import type { TermsConditionSchema } from "@/modules/masters/terms-condition/validations/termsCondition.validation";
import type { ResourceFormFieldConfig } from "@/modules/common/shared-crud/ResourceFormFields";

export const TERMS_CONDITION_DESCRIPTION_FIELD: Array<
  ResourceFormFieldConfig<TermsConditionSchema>
> = [
  {
    name: "description",
    label: "Terms & Conditions",
    placeholder: "Enter Terms & Condition",
    controlType: "textarea",
    textareaRows: 4,
  },
];
