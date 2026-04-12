export type Shipment = {
  id: string;
  code: number | null;
  shipmentType: string;
  createdAt: string;
  updatedAt: string;
};

export type ShipmentListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "shipmentType" | "code";
  sortDir?: "asc" | "desc";
};

export type ShipmentListResult = {
  items: Shipment[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};
