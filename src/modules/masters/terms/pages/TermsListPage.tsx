import { MasterListPage } from "@/modules/masters/shared/MasterListPage";
import { TermsDialog } from "@/modules/masters/terms/components/TermsDialog";
import { useDeleteTerms, useTerms } from "@/modules/masters/terms/hooks";
import type { Terms } from "@/modules/masters/terms/types";

export function TermsListPage() {
  return (
    <MasterListPage<
      Terms,
      {
        search?: string;
        page: number;
        limit: number;
        sortBy: "createdAt" | "terms";
        sortDir: "asc" | "desc";
      }
    >
      title="Terms"
      subtitle="Manage terms master data."
      newButtonText="New Terms"
      searchPlaceholder="Search terms or description..."
      minTableWidth="min-w-[780px]"
      emptyText="No terms found."
      deleteConfirmText="Delete this terms record?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Terms",
          getValue: (item) => item.terms,
          valueClassName: "font-medium",
        },
        {
          header: "Description",
          getValue: (item) => item.description,
        },
      ]}
      getIdValue={(item) => item.code}
      useList={
        useTerms as (query: {
          search?: string;
          page: number;
          limit: number;
          sortBy: "createdAt" | "terms";
          sortDir: "asc" | "desc";
        }) => {
          data?: { items: Terms[]; total: number };
          isLoading: boolean;
          error: unknown;
          refetch: () => Promise<unknown>;
        }
      }
      useDelete={useDeleteTerms}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <TermsDialog
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
