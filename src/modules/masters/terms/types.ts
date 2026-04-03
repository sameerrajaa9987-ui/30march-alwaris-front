export type Terms = {
  id: string;
  code: number | null;
  terms: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TermsListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "terms" | "description" | "code";
  sortDir?: "asc" | "desc";
};

export type TermsListResult = {
  items: Terms[];
  total: number;
};
