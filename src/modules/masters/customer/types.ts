export type CustomerType = {
  id: string;
  code: number | null;
  customerType: string;
  createdAt: string;
  updatedAt: string;
};

export type Customer = {
  id: string;
  code: number;
  customerTypeId: string;
  customerType?: string;
  mail: string;
  customerName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  pincode: string;
  contactPerson: string;
  contactNo: string;
  emailId: string;
  additionalEmailIds: string[];
  gstVatNo: string;
  creditDays: number;
  stateCode: string;
  panNo: string;
  createdAt: string;
  updatedAt: string;
};

export type CustomerTypeListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "customerType" | "code";
  sortDir?: "asc" | "desc";
};

export type CustomerListQuery = {
  search?: string;
  customerTypeId?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "code" | "customerName";
  sortDir?: "asc" | "desc";
};

export type CustomerListResult = {
  items: Customer[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};

export type CustomerTypeListResult = {
  items: CustomerType[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};

