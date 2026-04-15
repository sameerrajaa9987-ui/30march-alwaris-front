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
import type {
  VendorAgent,
  VendorType,
} from "@/modules/masters/vendor-agent/types";
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
} from "@/modules/masters/vendor-agent/constants/vendorAgentDialog.fields";

interface VendorAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  vendorTypes: VendorType[];
  value?: VendorAgent | null;
  onSuccess?: () => void;
}

export function VendorAgentDialog({
  open,
  onOpenChange,
  mode,
  vendorTypes,
  value,
  onSuccess,
}: VendorAgentDialogProps) {
  const createMutation = useCreateVendorAgent();
  const updateMutation = useUpdateVendorAgent();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const defaults = useMemo<VendorAgentSchema>(
    () => ({
      vendorTypeId: "",
      mail: "",
      vendorName: "",
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

  const formValues = useMemo<VendorAgentSchema>(
    () =>
      mode === "edit" && value
        ? {
            vendorTypeId: value.vendorTypeId,
            mail: value.mail,
            vendorName: value.vendorName,
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

  const form = useForm<VendorAgentSchema>({
    resolver: zodResolver(vendorAgentSchema),
    defaultValues: defaults,
    values: open ? formValues : defaults,
    mode: "onChange",
  });

  const vendorTypeId = useWatch({
    control: form.control,
    name: "vendorTypeId",
  });
  const mail = useWatch({ control: form.control, name: "mail" });

  const selectedVendorType = useMemo(
    () => vendorTypes.find((t) => t.id === vendorTypeId),
    [vendorTypes, vendorTypeId],
  );

  async function onSubmit(values: VendorAgentSchema) {
    const payload = {
      vendorTypeId: values.vendorTypeId,
      mail: values.mail || "",
      vendorName: values.vendorName,
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
    <ResourceDialog<VendorAgent, VendorAgentSchema, never>
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
            label="Vendor Type"
            className="md:col-span-3"
            error={form.formState.errors.vendorTypeId?.message}
          >
            <Select
              value={vendorTypeId || undefined}
              onValueChange={(v) =>
                form.setValue("vendorTypeId", v || "", {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <span
                  className={selectedVendorType ? "" : "text-muted-foreground"}
                >
                  {selectedVendorType?.vendorType ?? "---Select---"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {vendorTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.vendorType}
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

          <ResourceFormFields form={form} fields={VENDOR_AGENT_MAIN_FIELDS} />

          <div className="grid grid-cols-1 gap-4 md:col-span-5 md:grid-cols-2">
            <ResourceFormFields
              form={form}
              fields={VENDOR_AGENT_LOCATION_FIELDS}
            />
          </div>

          <ResourceFormFields
            form={form}
            fields={VENDOR_AGENT_CONTACT_FIELDS}
          />

          <div className="grid grid-cols-1 gap-4 md:col-span-5 md:grid-cols-2">
            <ResourceFormFields
              form={form}
              fields={VENDOR_AGENT_FINANCIAL_FIELDS}
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
