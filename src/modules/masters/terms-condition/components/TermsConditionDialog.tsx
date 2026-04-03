import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { MasterDialog } from "@/modules/masters/shared/MasterDialog";
import { MasterFormFields } from "@/modules/masters/shared/MasterFormFields";
import { useLineOfBix } from "@/modules/masters/line-of-bix/hooks";
import type { TermsCondition } from "@/modules/masters/terms-condition/types";
import {
  termsConditionSchema,
  type TermsConditionSchema,
} from "@/modules/masters/terms-condition/validations/termsCondition.validation";
import { TERMS_CONDITION_DESCRIPTION_FIELD } from "@/modules/masters/terms-condition/components/termsConditionDialog.fields";
import {
  useCreateTermsCondition,
  useUpdateTermsCondition,
} from "@/modules/masters/terms-condition/hooks";

const SELECT_NONE = "__none__";

interface TermsConditionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: TermsCondition | null;
  onSuccess?: () => void;
}

export function TermsConditionDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: TermsConditionDialogProps) {
  const createMutation = useCreateTermsCondition();
  const updateMutation = useUpdateTermsCondition();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const lineQuery = {
    page: 1,
    limit: 200,
    sortBy: "lineOfBix" as const,
    sortDir: "asc" as const,
  };

  const lineRes = useLineOfBix(lineQuery);
  const lineItems = useMemo(
    () => lineRes.data?.items ?? [],
    [lineRes.data?.items],
  );

  const defaults = useMemo<TermsConditionSchema>(
    () => ({ lineOfBixId: "", description: "" }),
    [],
  );

  const form = useForm<TermsConditionSchema>({
    resolver: zodResolver(termsConditionSchema),
    defaultValues: defaults,
    mode: "onChange",
  });

  const lineOfBixId = useWatch({ control: form.control, name: "lineOfBixId" });

  const selectedLine = useMemo(
    () => lineItems.find((item) => item.id === lineOfBixId),
    [lineItems, lineOfBixId],
  );

  useEffect(() => {
    if (!open) return;
    form.reset(
      mode === "edit" && value
        ? {
            lineOfBixId: value.lineOfBixId || "",
            description: value.description,
          }
        : defaults,
    );
  }, [open, mode, value, defaults, form]);

  async function onSubmit(values: TermsConditionSchema) {
    if (mode === "create") {
      await createMutation.mutateAsync(values);
    } else if (value?.id) {
      await updateMutation.mutateAsync({ id: value.id, payload: values });
    }
  }

  return (
    <MasterDialog<TermsCondition, TermsConditionSchema, never>
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="ADD NEW TERMS & CONDITION"
      editTitle="Edit Terms & Condition"
      customSubmit={async () => {
        await form.handleSubmit(onSubmit)();
      }}
      customIsPending={isPending}
      customDisableSubmit={
        isPending || !form.formState.isValid || lineRes.isLoading
      }
      renderBody={() => (
        <>
          {lineRes.error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {lineRes.error instanceof Error
                ? lineRes.error.message
                : "Failed to load line of bix options"}
            </div>
          ) : null}

          <div className="space-y-3 py-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Line Of BIX
              </label>
              <Select
                value={lineOfBixId || SELECT_NONE}
                onValueChange={(value) =>
                  form.setValue(
                    "lineOfBixId",
                    value && value !== SELECT_NONE ? value : "",
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    },
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <span className={selectedLine ? "" : "text-muted-foreground"}>
                    {selectedLine?.lineOfBix ?? "---Select---"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SELECT_NONE}>---Select---</SelectItem>
                  {lineItems.map((line) => (
                    <SelectItem key={line.id} value={line.id}>
                      {line.lineOfBix}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.lineOfBixId?.message ? (
                <div className="mt-1 text-xs text-red-600">
                  {form.formState.errors.lineOfBixId.message}
                </div>
              ) : null}
            </div>

            <div>
              <MasterFormFields
                form={form}
                fields={TERMS_CONDITION_DESCRIPTION_FIELD}
              />
            </div>
          </div>
        </>
      )}
    />
  );
}
