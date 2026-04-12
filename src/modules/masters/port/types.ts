export type Port = {
  id: string;
  code: number | null;
  portCode: string;
  portName: string;
  createdAt: string;
  updatedAt: string;
};

export type PortListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "portCode" | "portName" | "code";
  sortDir?: "asc" | "desc";
};

export type PortListResult = {
  items: Port[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};
