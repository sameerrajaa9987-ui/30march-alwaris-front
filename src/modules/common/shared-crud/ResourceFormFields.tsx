import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";

type FieldControlType = "input" | "textarea";

export interface ResourceFormFieldConfig<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label: string;
  placeholder?: string;
  className?: string;
  controlType?: FieldControlType;
  inputType?: "text" | "number" | "email";
  valueAsNumber?: boolean;
  textareaRows?: number;
}

interface ResourceFormFieldsProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  fields: Array<ResourceFormFieldConfig<TFormValues>>;
}

export function ResourceFormFields<TFormValues extends FieldValues>({
  form,
  fields,
}: ResourceFormFieldsProps<TFormValues>) {
  return (
    <>
      {fields.map((field) => {
        const errorMessage = (
          form.formState.errors as Record<string, { message?: string }>
        )[field.name as string]?.message;

        return (
          <div key={field.name as string} className={field.className}>
            <label className="text-xs font-medium text-muted-foreground">
              {field.label}
            </label>
            <div className="mt-1">
              {field.controlType === "textarea" ? (
                <textarea
                  {...form.register(field.name)}
                  rows={field.textareaRows ?? 4}
                  placeholder={field.placeholder}
                  className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-base leading-relaxed transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                />
              ) : (
                <Input
                  type={field.inputType ?? "text"}
                  placeholder={field.placeholder}
                  {...form.register(
                    field.name,
                    field.valueAsNumber ? { valueAsNumber: true } : undefined,
                  )}
                />
              )}
            </div>
            {errorMessage ? (
              <div className="mt-1 text-xs text-red-600">{errorMessage}</div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
