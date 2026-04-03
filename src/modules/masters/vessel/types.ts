export type Vessel = {
  id: string;
  code: number | null;
  vesselName: string;
  createdAt: string;
  updatedAt: string;
};

export type VesselListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "vesselName" | "code";
  sortDir?: "asc" | "desc";
};

export type VesselListResult = {
  items: Vessel[];
  total: number;
};
