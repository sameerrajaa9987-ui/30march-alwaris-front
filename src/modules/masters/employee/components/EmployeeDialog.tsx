import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResourceDialog } from "@/modules/common/shared-crud/ResourceDialog";
import { ResourceFormFields } from "@/modules/common/shared-crud/ResourceFormFields";
import {
  useCreateEmployee,
  useUpdateEmployee,
} from "@/modules/masters/employee/hooks";
import {
  DEPARTMENT_OPTIONS,
  isDepartment,
} from "@/modules/masters/employee/constants";
import { employeeSchema } from "@/modules/masters/employee/validations/employee.validation";
import type { Employee } from "@/modules/masters/employee/types";
import { EMPLOYEE_DIALOG_FIELDS } from "@/modules/masters/employee/constants/employeeDialog.fields";

const schema = employeeSchema;

type FormValues = z.infer<typeof schema>;

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  mode: "create" | "edit";
  onSuccess?: () => void;
}

export function EmployeeDialog({
  open,
  onOpenChange,
  employee,
  mode,
  onSuccess,
}: EmployeeDialogProps) {
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const defaultValues = useMemo<FormValues>(
    () => ({
      isActive: true,
      isApproved: false,
      employeeName: "",
      department: "Other",
      address: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
      contactNo: "",
      emailId: "",
    }),
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });
  const isApproved = useWatch({ control: form.control, name: "isApproved" });
  const department = useWatch({ control: form.control, name: "department" });

  useEffect(() => {
    if (open) {
      form.reset(
        mode === "edit" && employee
          ? {
              isActive: employee.isActive,
              isApproved: employee.isApproved,
              employeeName: employee.employeeName,
              department: employee.department,
              address: employee.address,
              city: employee.city,
              pincode: employee.pincode,
              state: employee.state,
              country: employee.country,
              contactNo: employee.contactNo,
              emailId: employee.emailId,
            }
          : defaultValues,
      );
    }
  }, [open, mode, employee, defaultValues, form]);

  async function onSubmit(values: FormValues) {
    if (mode === "create") {
      await createMutation.mutateAsync(values);
    } else {
      if (!employee?.id) return;
      await updateMutation.mutateAsync({ id: employee.id, payload: values });
    }
  }

  return (
    <ResourceDialog<Employee, FormValues, never>
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={employee}
      onSuccess={onSuccess}
      createTitle="Add New Employee"
      editTitle="Edit Employee"
      dialogContentClassName="max-w-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto"
      customSubmit={async () => {
        await form.handleSubmit(onSubmit)();
      }}
      customIsPending={isPending}
      customDisableSubmit={isPending || !form.formState.isValid}
      submitLabelCreate="Create Employee"
      submitLabelEdit="Save Changes"
      renderBody={() => (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 py-4">
          <div className="md:col-span-12 flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2 text-sm text-foreground/85">
              <Checkbox
                checked={isActive}
                onCheckedChange={(checked) =>
                  form.setValue("isActive", Boolean(checked), {
                    shouldValidate: true,
                  })
                }
              />
              <span>Active</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-foreground/85">
              <Checkbox
                checked={isApproved}
                onCheckedChange={(checked) =>
                  form.setValue("isApproved", Boolean(checked), {
                    shouldValidate: true,
                  })
                }
              />
              <span>Approved</span>
            </label>
          </div>

          <Field
            label="Employee Name"
            error={form.formState.errors.employeeName?.message}
            className="md:col-span-6"
          >
            <Input {...form.register("employeeName")} />
          </Field>

          <Field
            label="Department"
            error={form.formState.errors.department?.message}
            className="md:col-span-6"
          >
            <Select
              value={department}
              onValueChange={(v) => {
                if (isDepartment(v)) {
                  form.setValue("department", v, { shouldValidate: true });
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENT_OPTIONS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <ResourceFormFields
            form={form}
            fields={EMPLOYEE_DIALOG_FIELDS.filter(
              (field) => field.name !== "employeeName",
            )}
          />
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
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
  );
}
