import { useEffect, useMemo, useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getApiErrorMessage } from "@/shared/api/http";
import { toast } from "@/shared/lib/toast";

type BaseListQuery = {
  search?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortDir: "asc" | "desc";
};

interface ResourceListColumn<TItem> {
  header: string;
  getValue: (item: TItem) => React.ReactNode;
  valueClassName?: string | ((item: TItem) => string | undefined);
}

interface ResourceListPageProps<
  TItem extends { id: string },
  TQuery extends BaseListQuery,
> {
  title: string;
  subtitle: string;
  newButtonText: string;
  searchPlaceholder?: string;
  minTableWidth: string;
  emptyText: string;
  deleteConfirmText: string;
  defaultSortBy?: TQuery["sortBy"];
  disableCreate?: boolean;
  columns: Array<ResourceListColumn<TItem>>;
  getIdValue: (item: TItem) => string | number | null | undefined;
  buildQuery?: (args: {
    search: string;
    page: number;
    limit: number;
  }) => TQuery;
  renderFilters?: (args: {
    search: string;
    setSearch: (value: string) => void;
  }) => React.ReactNode;
  hideDefaultSearch?: boolean;
  hideIdColumn?: boolean;
  useList: (query: TQuery) => {
    data?: {
      items: TItem[];
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
  };
  useDelete: () => {
    mutateAsync: (id: string) => Promise<unknown>;
  };
  renderDialog: (args: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    value: TItem | null;
    onSuccess: () => void;
  }) => React.ReactNode;
}

export function ResourceListPage<
  TItem extends { id: string },
  TQuery extends BaseListQuery,
>({
  title,
  subtitle,
  newButtonText,
  searchPlaceholder,
  minTableWidth,
  emptyText,
  deleteConfirmText,
  defaultSortBy,
  disableCreate,
  columns,
  getIdValue,
  buildQuery,
  renderFilters,
  hideDefaultSearch,
  hideIdColumn,
  useList,
  useDelete,
  renderDialog,
}: ResourceListPageProps<TItem, TQuery>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editing, setEditing] = useState<TItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function setSearchAndResetPage(value: string) {
    setSearch(value);
    setPage(1);
  }

  function buildPageItems(
    currentPage: number,
    totalPages: number,
  ): Array<number | "ellipsis"> {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  }

  const baseQuery = buildQuery?.({
    search,
    page,
    limit: pageSize,
  });

  const query = {
    ...(baseQuery ?? {
      search: search.trim() || undefined,
      sortBy: defaultSortBy,
      sortDir: "desc",
    }),
    page,
    limit: pageSize,
  } as TQuery;

  const { data, isLoading, error, refetch } = useList(query);
  const deleteMutation = useDelete();
  const items = data?.items ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPages = Math.max(1, data?.meta?.totalPages ?? 1);
  const hasNextPage = data?.meta?.hasNextPage ?? false;
  const hasPrevPage = data?.meta?.hasPrevPage ?? false;
  const pageItems = useMemo(
    () => buildPageItems(page, totalPages),
    [page, totalPages],
  );
  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = total === 0 ? 0 : Math.min(page * pageSize, total);

  useEffect(() => {
    // Prevent forcing page to a lower value while a page transition is still fetching.
    // Without this, fast page switching can cause stale totalPages to temporarily reset page to 1.
    if (!isLoading && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, isLoading]);

  function onCreate() {
    setMode("create");
    setEditing(null);
    setOpen(true);
  }

  function onEdit(item: TItem) {
    setMode("edit");
    setEditing(item);
    setOpen(true);
  }

  function attemptDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setDeleteDialogOpen(false);
      setDeletingId(null);
    }
  }

  return (
    <div className="erp-page">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-lg font-semibold text-foreground">{title}</div>
          <div className="text-sm text-muted-foreground">
            {subtitle} Total: {total}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={onCreate} disabled={disableCreate}>
            <Plus className="mr-2 h-4 w-4" />
            {newButtonText}
          </Button>
        </div>
      </div>

      {renderFilters ? (
        renderFilters({ search, setSearch: setSearchAndResetPage })
      ) : hideDefaultSearch ? null : (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <label className="block text-xs font-medium text-muted-foreground">
            Search
          </label>
          <Input
            value={search}
            onChange={(e) => setSearchAndResetPage(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full max-w-xl"
          />
        </div>
      )}

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error instanceof Error ? error.message : "An error occurred"}
        </div>
      ) : null}

      <div className="overflow-auto rounded-xl border border-border bg-card shadow-sm">
        <Table className={minTableWidth}>
          <TableHeader className="bg-muted/35">
            <TableRow>
              <TableHead className="w-[180px]">Actions</TableHead>
              {hideIdColumn ? null : (
                <TableHead className="w-[90px]">ID</TableHead>
              )}
              {columns.map((column) => (
                <TableHead key={column.header}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (hideIdColumn ? 1 : 2)}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (hideIdColumn ? 1 : 2)}>
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onEdit(item)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => attemptDelete(item.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                  {hideIdColumn ? null : (
                    <TableCell>{getIdValue(item) ?? "-"}</TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.header}
                      className={
                        typeof column.valueClassName === "function"
                          ? column.valueClassName(item)
                          : column.valueClassName
                      }
                    >
                      {column.getValue(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {rangeStart} - {rangeEnd} of {total}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Rows per page:</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[90px]">
              <SelectValue placeholder="50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full overflow-x-auto md:w-auto">
          <Pagination className="mx-0 w-max min-w-full justify-start md:min-w-0 md:w-auto md:justify-end">
            <PaginationContent className="flex-nowrap">
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(1);
                  }}
                  className={
                    !hasPrevPage ? "pointer-events-none opacity-50" : undefined
                  }
                >
                  <ChevronsLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPrevPage) setPage((prev) => prev - 1);
                  }}
                  className={
                    !hasPrevPage ? "pointer-events-none opacity-50" : undefined
                  }
                />
              </PaginationItem>

              {pageItems.map((item, index) =>
                item === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={item === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasNextPage) setPage((prev) => prev + 1);
                  }}
                  className={
                    !hasNextPage ? "pointer-events-none opacity-50" : undefined
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(totalPages);
                  }}
                  className={
                    !hasNextPage ? "pointer-events-none opacity-50" : undefined
                  }
                >
                  <ChevronsRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="text-xs text-muted-foreground md:hidden">
          Page {page} of {totalPages}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>{deleteConfirmText}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {renderDialog({
        open,
        onOpenChange: setOpen,
        mode,
        value: editing,
        onSuccess: () => {
          setPage(1);
          void refetch();
        },
      })}
    </div>
  );
}
