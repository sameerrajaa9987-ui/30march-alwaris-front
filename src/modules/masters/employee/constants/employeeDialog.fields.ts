import type { EmployeeSchema } from "@/modules/masters/employee/validations/employee.validation";
import type { ResourceFormFieldConfig } from "@/modules/common/shared-crud/ResourceFormFields";

export const EMPLOYEE_DIALOG_FIELDS: Array<
  ResourceFormFieldConfig<EmployeeSchema>
> = [
  {
    name: "employeeName",
    label: "Employee Name",
    className: "md:col-span-6",
  },
  {
    name: "address",
    label: "Address",
    className: "md:col-span-12",
    controlType: "textarea",
    textareaRows: 5,
    placeholder: "Enter Address",
  },
  {
    name: "city",
    label: "City",
    className: "md:col-span-3",
  },
  {
    name: "pincode",
    label: "Pincode",
    className: "md:col-span-3",
  },
  {
    name: "state",
    label: "State",
    className: "md:col-span-3",
  },
  {
    name: "country",
    label: "Country",
    className: "md:col-span-3",
  },
  {
    name: "contactNo",
    label: "Contact No",
    className: "md:col-span-6",
  },
  {
    name: "emailId",
    label: "Email ID",
    className: "md:col-span-6",
    inputType: "email",
  },
];
