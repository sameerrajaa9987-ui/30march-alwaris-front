import type { BillOfLadingTableQuery } from "@/modules/bill-of-lading/types";

export function buildBillOfLadingTableQuery(args: {
  search: string;
  filtersSearch: string;
  page: number;
  limit: number;
}): BillOfLadingTableQuery {
  return {
    search: (args.filtersSearch || args.search).trim() || undefined,
    page: args.page,
    limit: args.limit,
    sortBy: "createdAt",
    sortDir: "desc",
  };
}
