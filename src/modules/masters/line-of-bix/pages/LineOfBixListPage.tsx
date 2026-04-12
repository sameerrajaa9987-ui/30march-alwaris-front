import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { LineOfBixDialog } from "@/modules/masters/line-of-bix/components/LineOfBixDialog";
import {
  useDeleteLineOfBix,
  useLineOfBix,
} from "@/modules/masters/line-of-bix/hooks";
import type { LineOfBix } from "@/modules/masters/line-of-bix/types";

export function LineOfBixListPage() {
  return (
    <ResourceListPage<
      LineOfBix,
      {
        search?: string;
        page: number;
        limit: number;
        sortBy: "createdAt" | "lineOfBix";
        sortDir: "asc" | "desc";
      }
    >
      title="Line Of BIX"
      subtitle="Manage line of bix master data."
      newButtonText="New Line Of BIX"
      searchPlaceholder="Search code or line of bix..."
      minTableWidth="min-w-[760px]"
      emptyText="No line of bix records found."
      deleteConfirmText="Delete this line of bix?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Code",
          getValue: (item) => item.code,
          valueClassName: "font-medium",
        },
        {
          header: "Line Of BIX",
          getValue: (item) => item.lineOfBix,
        },
      ]}
      getIdValue={(item) => item.counter}
      useList={
        useLineOfBix as (query: {
          search?: string;
          page: number;
          limit: number;
          sortBy: "createdAt" | "lineOfBix";
          sortDir: "asc" | "desc";
        }) => {
          data?: {
            items: LineOfBix[];
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
      useDelete={useDeleteLineOfBix}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <LineOfBixDialog
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
