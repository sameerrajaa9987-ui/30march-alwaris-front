import type { CustomerSchema } from "@/modules/masters/customer/validations/customer.validation";
import type { ResourceFormFieldConfig } from "@/modules/common/shared-crud/ResourceFormFields";

export const CUSTOMER_MAIN_FIELDS: Array<
  ResourceFormFieldConfig<CustomerSchema>
> = [
  {
    name: "customerName",
    label: "Customer Name",
    placeholder: "Enter Customer Name",
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

export const CUSTOMER_LOCATION_FIELDS: Array<
  ResourceFormFieldConfig<CustomerSchema>
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

export const CUSTOMER_CONTACT_FIELDS: Array<
  ResourceFormFieldConfig<CustomerSchema>
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
    placeholder: "email1@company.com, email2@company.com",
    className: "md:col-span-7",
    controlType: "textarea",
    textareaRows: 4,
  },
];

export const CUSTOMER_FINANCIAL_FIELDS: Array<
  ResourceFormFieldConfig<CustomerSchema>
> = [
  {
    name: "gstVatNo",
    label: "GST No / VAT No",
    placeholder: "Enter GST / VAT No",
  },
  {
    name: "stateCode",
    label: "State Code",
    placeholder: "Enter State Code",
  },
  {
    name: "creditDays",
    label: "Credit Days",
    placeholder: "Enter Credit Days",
    inputType: "number",
    valueAsNumber: true,
  },
  {
    name: "panNo",
    label: "Pan No.",
    placeholder: "Enter Pan No.",
  },
];
