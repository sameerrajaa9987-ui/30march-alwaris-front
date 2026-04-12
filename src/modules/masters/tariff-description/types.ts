export type TariffDescription = {
  id: string;
  counter: number | null;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TariffDescriptionListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "counter" | "description";
  sortDir?: "asc" | "desc";
};

export type TariffDescriptionListResult = {
  items: TariffDescription[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};
