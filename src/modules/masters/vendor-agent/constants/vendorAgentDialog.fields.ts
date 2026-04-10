import type { VendorAgentSchema } from "@/modules/masters/vendor-agent/validations/vendorAgent.validation";
import type { ResourceFormFieldConfig } from "@/modules/common/shared-crud/ResourceFormFields";

export const VENDOR_AGENT_MAIN_FIELDS: Array<
  ResourceFormFieldConfig<VendorAgentSchema>
> = [
  {
    name: "vendorName",
    label: "Vendor Name",
    placeholder: "Enter Vendor Name",
    className: "md:col-span-6",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter Address",
    className: "md:col-span-7",
    controlType: "textarea",
    textareaRows: 4,
  },
];

export const VENDOR_AGENT_LOCATION_FIELDS: Array<
  ResourceFormFieldConfig<VendorAgentSchema>
> = [
  {
    name: "city",
    label: "City",
  },
  {
    name: "state",
    label: "State",
  },
  {
    name: "country",
    label: "Country",
  },
  {
    name: "pincode",
    label: "Pincode",
    placeholder: "Enter Pincode",
  },
];

export const VENDOR_AGENT_CONTACT_FIELDS: Array<
  ResourceFormFieldConfig<VendorAgentSchema>
> = [
  {
    name: "contactPerson",
    label: "Contact Person",
    placeholder: "Enter Contact Person",
    className: "md:col-span-4",
  },
  {
    name: "contactNo",
    label: "Contact No",
    placeholder: "Enter Contact No",
    className: "md:col-span-4",
  },
  {
    name: "emailId",
    label: "Email ID",
    placeholder: "Enter Email ID",
    className: "md:col-span-4",
    inputType: "email",
  },
  {
    name: "additionalEmailIds",
    label: "Email ID (Multiple)",
    placeholder: "Enter Email ID",
    className: "md:col-span-7",
    controlType: "textarea",
    textareaRows: 4,
  },
];

export const VENDOR_AGENT_FINANCIAL_FIELDS: Array<
  ResourceFormFieldConfig<VendorAgentSchema>
> = [
  {
    name: "gstVatNo",
    label: "GST No / VAT No",
    placeholder: "Enter GST / VAT No",
  },
  {
    name: "creditDays",
    label: "Credit Days",
    placeholder: "Enter Credit Days",
    inputType: "number",
    valueAsNumber: true,
  },
  {
    name: "stateCode",
    label: "State Code",
    placeholder: "Enter State Code",
  },
  {
    name: "panNo",
    label: "Pan No.",
    placeholder: "Enter Pan No.",
  },
];
