import { useEffect, useMemo } from "react";
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
import { MasterDialog } from "@/modules/masters/shared/MasterDialog";
import { MasterFormFields } from "@/modules/masters/shared/MasterFormFields";
import type { CustomerType } from "@/modules/masters/customer/types";
import type { VendorAgent } from "@/modules/masters/vendor-agent/types";
import {
  vendorAgentSchema,
  parseAdditionalEmails,
  type VendorAgentSchema,
} from "@/modules/masters/vendor-agent/validations/vendorAgent.validation";
import {
  useCreateVendorAgent,
  useUpdateVendorAgent,
} from "@/modules/masters/vendor-agent/hooks";
import {
  VENDOR_AGENT_CONTACT_FIELDS,
  VENDOR_AGENT_FINANCIAL_FIELDS,
  VENDOR_AGENT_LOCATION_FIELDS,
  VENDOR_AGENT_MAIN_FIELDS,
} from "@/modules/masters/vendor-agent/components/vendorAgentDialog.fields";

interface VendorAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  customerTypes: CustomerType[];
  value?: VendorAgent | null;
  onSuccess?: () => void;
}

export function VendorAgentDialog({
  open,
  onOpenChange,
  mode,
  customerTypes,
  value,
  onSuccess,
}: VendorAgentDialogProps) {
  const createMutation = useCreateVendorAgent();
  const updateMutation = useUpdateVendorAgent();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const defaults = useMemo<VendorAgentSchema>(
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

  const form = useForm<VendorAgentSchema>({
    resolver: zodResolver(vendorAgentSchema),
    defaultValues: defaults,
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

  useEffect(() => {
    if (!open) return;
    form.reset(
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
    );
  }, [open, mode, value, defaults, form]);

  async function onSubmit(values: VendorAgentSchema) {
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
      additionalEmailIds: parseAdditionalEmails(values.additionalEmailIds || ""),
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
    <MasterDialog<VendorAgent, VendorAgentSchema, never>
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="Add New Vendor"
      editTitle="Edit Vendor / Agent"
      dialogContentClassName="max-h-[92vh] w-[calc(100vw-2rem)] sm:w-[800px] sm:max-w-[800px] overflow-y-auto"
      customSubmit={async () => {
        await form.handleSubmit(onSubmit)();
      }}
      customIsPending={isPending}
      customDisableSubmit={isPending || !form.formState.isValid}
      submitLabelCreate="Create"
      submitLabelEdit="Save"
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
                  {selectedCustomerType?.customerType ?? "---Select---"}
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
              placeholder="Auto (IC...)"
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

          <MasterFormFields form={form} fields={VENDOR_AGENT_MAIN_FIELDS} />

          <div className="grid grid-cols-1 gap-4 md:col-span-5 md:grid-cols-2">
            <MasterFormFields form={form} fields={VENDOR_AGENT_LOCATION_FIELDS} />
          </div>

          <MasterFormFields form={form} fields={VENDOR_AGENT_CONTACT_FIELDS} />

          <div className="grid grid-cols-1 gap-4 md:col-span-5 md:grid-cols-2">
            <MasterFormFields form={form} fields={VENDOR_AGENT_FINANCIAL_FIELDS} />
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
