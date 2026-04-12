export type Service = {
  id: string;
  code: number | null;
  serviceType: string;
  createdAt: string;
  updatedAt: string;
};

export type ServiceListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "serviceType" | "code";
  sortDir?: "asc" | "desc";
};

export type ServiceListResult = {
  items: Service[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};
