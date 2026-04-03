export type LineOfBix = {
  id: string;
  counter: number | null;
  code: string;
  lineOfBix: string;
  createdAt: string;
  updatedAt: string;
};

export type LineOfBixListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "counter" | "code" | "lineOfBix";
  sortDir?: "asc" | "desc";
};

export type LineOfBixListResult = {
  items: LineOfBix[];
  total: number;
};
