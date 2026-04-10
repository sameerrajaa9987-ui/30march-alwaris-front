import type { SeaBookingTableQuery } from "@/modules/booking/types";

const MASTER_LIST_LIMIT = 200;

export const SEA_BOOKING_MASTER_QUERIES = {
  employees: {
    page: 1,
    limit: MASTER_LIST_LIMIT,
    sortBy: "employeeName",
    sortDir: "asc",
  },
  customers: {
    page: 1,
    limit: MASTER_LIST_LIMIT,
    sortBy: "customerName",
    sortDir: "asc",
  },
  ports: {
    page: 1,
    limit: MASTER_LIST_LIMIT,
    sortBy: "portName",
    sortDir: "asc",
  },
  terms: {
    page: 1,
    limit: MASTER_LIST_LIMIT,
    sortBy: "terms",
    sortDir: "asc",
  },
  lineOfBix: {
    page: 1,
    limit: MASTER_LIST_LIMIT,
    sortBy: "lineOfBix",
    sortDir: "asc",
  },
  vessels: {
    page: 1,
    limit: MASTER_LIST_LIMIT,
    sortBy: "vesselName",
    sortDir: "asc",
  },
  tariffDescriptions: {
    page: 1,
    limit: MASTER_LIST_LIMIT,
    sortBy: "description",
    sortDir: "asc",
  },
  vendorAgents: {
    page: 1,
    limit: MASTER_LIST_LIMIT,
    sortBy: "vendorName",
    sortDir: "asc",
  },
} as const;

export function buildSeaBookingTableQuery(args: {
  search: string;
  filtersSearch: string;
  page: number;
  limit: number;
}): SeaBookingTableQuery {
  return {
    search: (args.filtersSearch || args.search).trim() || undefined,
    page: args.page,
    limit: args.limit,
    sortBy: "createdAt",
    sortDir: "desc",
  };
}
