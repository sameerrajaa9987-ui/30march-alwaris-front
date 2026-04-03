import type { TermsConditionSchema } from "@/modules/masters/terms-condition/validations/termsCondition.validation";
import type { MasterFormFieldConfig } from "@/modules/masters/shared/MasterFormFields";

export const TERMS_CONDITION_DESCRIPTION_FIELD: Array<
  MasterFormFieldConfig<TermsConditionSchema>
> = [
  {
    name: "description",
    label: "Terms & Conditions",
    placeholder: "Enter Terms & Condition",
    controlType: "textarea",
    textareaRows: 4,
  },
];
