export type VendorType = {
  id: string;
  code: number | null;
  vendorType: string;
  createdAt: string;
  updatedAt: string;
};

export type VendorAgent = {
  id: string;
  code: string;
  vendorTypeId: string;
  vendorType?: string;
  mail: string;
  vendorName: string;
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

export type VendorAgentListQuery = {
  search?: string;
  vendorTypeId?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "code" | "vendorName";
  sortDir?: "asc" | "desc";
};

export type VendorTypeListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "vendorType" | "code";
  sortDir?: "asc" | "desc";
};

export type VendorAgentListResult = {
  items: VendorAgent[];
  total: number;
};

export type VendorTypeListResult = {
  items: VendorType[];
  total: number;
};
