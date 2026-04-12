export type TermsCondition = {
  id: string;
  counter: number | null;
  lineOfBixId: string | null;
  code: string;
  lineBix: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TermsConditionListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "counter" | "description";
  sortDir?: "asc" | "desc";
};

export type TermsConditionListResult = {
  items: TermsCondition[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};

