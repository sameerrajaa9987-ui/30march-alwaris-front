import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { TermsConditionDialog } from "@/modules/masters/terms-condition/components/TermsConditionDialog";
import {
  useDeleteTermsCondition,
  useTermsConditions,
} from "@/modules/masters/terms-condition/hooks";
import type { TermsCondition } from "@/modules/masters/terms-condition/types";

export function TermsConditionListPage() {
  return (
    <ResourceListPage<
      TermsCondition,
      {
        search?: string;
        page: number;
        limit: number;
        sortBy: "createdAt" | "counter";
        sortDir: "asc" | "desc";
      }
    >
      title="Terms & Condition"
      subtitle="Manage terms & condition master data."
      newButtonText="New Terms & Condition"
      searchPlaceholder="Search code, line bix, or description..."
      minTableWidth="min-w-[950px]"
      emptyText="No terms & conditions found."
      deleteConfirmText="Delete this terms & condition?"
      defaultSortBy="createdAt"
      buildQuery={({ search: currentSearch, page, limit }) => ({
        search: currentSearch.trim() || undefined,
        page,
        limit,
        sortBy: "createdAt",
        sortDir: "desc",
      })}
      columns={[
        {
          header: "Code",
          getValue: (item) => item.code || "-",
          valueClassName: "font-medium",
        },
        { header: "LineBIX", getValue: (item) => item.lineBix || "-" },
        { header: "Description", getValue: (item) => item.description },
      ]}
      getIdValue={(item) => item.counter ?? "-"}
      useList={
        useTermsConditions as (query: {
          search?: string;
          page: number;
          limit: number;
          sortBy: "createdAt" | "counter";
          sortDir: "asc" | "desc";
        }) => {
          data?: {
            items: TermsCondition[];
            meta: {
              total: number;
              totalPages: number;
              hasNextPage: boolean;
              hasPrevPage: boolean;
            };
          };
          isLoading: boolean;
          error: unknown;
          refetch: () => Promise<unknown>;
        }
      }
      useDelete={useDeleteTermsCondition}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <TermsConditionDialog
          open={open}
          onOpenChange={onOpenChange}
          mode={mode}
          value={value}
          onSuccess={onSuccess}
        />
      )}
    />
  );
}
