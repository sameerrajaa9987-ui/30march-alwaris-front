import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ResourceDialog } from "@/modules/common/shared-crud/ResourceDialog";
import { ResourceFormFields } from "@/modules/common/shared-crud/ResourceFormFields";
import type { Customer, CustomerType } from "@/modules/masters/customer/types";
import {
  customerSchema,
  parseAdditionalEmails,
  type CustomerSchema,
} from "@/modules/masters/customer/validations/customer.validation";
import {
  useCreateCustomer,
  useUpdateCustomer,
} from "@/modules/masters/customer/hooks";
import {
  CUSTOMER_CONTACT_FIELDS,
  CUSTOMER_FINANCIAL_FIELDS,
  CUSTOMER_LOCATION_FIELDS,
  CUSTOMER_MAIN_FIELDS,
} from "@/modules/masters/customer/constants/customerDialog.fields";

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  customerTypes: CustomerType[];
  value?: Customer | null;
  onSuccess?: () => void;
}

export function CustomerDialog({
  open,
  onOpenChange,
  mode,
  customerTypes,
  value,
  onSuccess,
}: CustomerDialogProps) {
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const defaults = useMemo<CustomerSchema>(
    () => ({
      customerTypeId: "",
      mail: "",
      customerName: "",
      address: "",
      city: "",
      country: "",
      state: "",
      pincode: "",
      contactPerson: "",
      contactNo: "",
      emailId: "",
      additionalEmailIds: "",
      gstVatNo: "",
      creditDays: 0,
      stateCode: "",
      panNo: "",
    }),
    [],
  );

  const formValues = useMemo<CustomerSchema>(
    () =>
      mode === "edit" && value
        ? {
            customerTypeId: value.customerTypeId,
            mail: value.mail,
            customerName: value.customerName,
            address: value.address,
            city: value.city,
            country: value.country,
            state: value.state,
            pincode: value.pincode,
            contactPerson: value.contactPerson,
            contactNo: value.contactNo,
            emailId: value.emailId,
            additionalEmailIds: value.additionalEmailIds.join(", "),
            gstVatNo: value.gstVatNo,
            creditDays: value.creditDays,
            stateCode: value.stateCode,
            panNo: value.panNo,
          }
        : defaults,
    [mode, value, defaults],
  );

  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaults,
    values: open ? formValues : defaults,
    mode: "onChange",
  });

  const customerTypeId = useWatch({
    control: form.control,
    name: "customerTypeId",
  });
  const mail = useWatch({ control: form.control, name: "mail" });

  const selectedCustomerType = useMemo(
    () => customerTypes.find((t) => t.id === customerTypeId),
    [customerTypes, customerTypeId],
  );

  async function onSubmit(values: CustomerSchema) {
    const payload = {
      customerTypeId: values.customerTypeId,
      mail: values.mail || "",
      customerName: values.customerName,
      address: values.address,
      city: values.city,
      country: values.country,
      state: values.state,
      pincode: values.pincode,
      contactPerson: values.contactPerson,
      contactNo: values.contactNo,
      emailId: values.emailId,
      additionalEmailIds: parseAdditionalEmails(
        values.additionalEmailIds || "",
      ),
      gstVatNo: values.gstVatNo || "",
      creditDays: values.creditDays,
      stateCode: values.stateCode || "",
      panNo: values.panNo || "",
    };

    if (mode === "create") {
      await createMutation.mutateAsync(payload);
    } else if (value?.id) {
      await updateMutation.mutateAsync({ id: value.id, payload });
    }
  }

  return (
    <ResourceDialog<Customer, CustomerSchema, never>
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="Add New Customer Details"
      editTitle="Edit Customer Details"
      dialogContentClassName="max-h-[92vh] w-[calc(100vw-2rem)] sm:w-[800px] sm:max-w-[800px] overflow-y-auto"
      customSubmit={async () => {
        await form.handleSubmit(onSubmit)();
      }}
      customIsPending={isPending}
      customDisableSubmit={isPending || !form.formState.isValid}
      submitLabelCreate="Create Customer"
      submitLabelEdit="Save Changes"
      renderBody={() => (
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-12">
          <Field
            label="Customer Type"
            className="md:col-span-3"
            error={form.formState.errors.customerTypeId?.message}
          >
            <Select
              value={customerTypeId || undefined}
              onValueChange={(v) =>
                form.setValue("customerTypeId", v || "", {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <span
                  className={
                    selectedCustomerType ? "" : "text-muted-foreground"
                  }
                >
                  {selectedCustomerType?.customerType ?? "Select customer type"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {customerTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.customerType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Code" className="md:col-span-2">
            <Input
              value={mode === "edit" ? String(value?.code ?? "") : ""}
              placeholder="Enter Customer"
              disabled
            />
          </Field>

          <Field
            label="Mail"
            className="md:col-span-1"
            error={form.formState.errors.mail?.message}
          >
            <div className="flex h-8 items-center">
              <Checkbox
                checked={mail === "Y"}
                onCheckedChange={(checked) =>
                  form.setValue("mail", checked === true ? "Y" : "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
            </div>
          </Field>

          <ResourceFormFields form={form} fields={CUSTOMER_MAIN_FIELDS} />

          <div className="grid grid-cols-1 gap-4 md:col-span-5 md:grid-cols-2">
            <ResourceFormFields form={form} fields={CUSTOMER_LOCATION_FIELDS} />
          </div>

          <ResourceFormFields form={form} fields={CUSTOMER_CONTACT_FIELDS} />

          <div className="grid grid-cols-1 gap-4 md:col-span-5 md:grid-cols-2">
            <ResourceFormFields
              form={form}
              fields={CUSTOMER_FINANCIAL_FIELDS}
            />
          </div>
        </div>
      )}
    />
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {error ? <div className="mt-1 text-xs text-red-600">{error}</div> : null}
    </div>
  );
}
