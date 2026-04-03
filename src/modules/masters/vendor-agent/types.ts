export type VendorAgent = {
  id: string;
  code: string;
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

export type VendorAgentListQuery = {
  search?: string;
  customerTypeId?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "code" | "customerName";
  sortDir?: "asc" | "desc";
};

export type VendorAgentListResult = {
  items: VendorAgent[];
  total: number;
};
