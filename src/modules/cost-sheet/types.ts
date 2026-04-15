export type CostSheetCurrency = "USD" | "AED";
export type CostSheetChargedPer = "DOCS" | "CONT";
export type CostSheetStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Rejected";

export type CostSheetLineItem = {
  id: string;
  chargeDescriptionId: string;
  chargeDescriptionName: string;
  chargeDescriptionCode: string;
  billingPartyId?: string;
  billingPartyName?: string;
  vendorId?: string;
  vendorName?: string;
  chargedPer: CostSheetChargedPer;
  qty: number;
  size: string;
  type: string;
  currency: CostSheetCurrency;
  rate: number;
  amount: number;
  remarks: string;
};

export type CostSheetJobOption = {
  jobNo: number;
};

export type CostSheetBookingSnapshot = {
  bookingId: string;
  jobNo: number;
  bookingParty: string;
  shipper: string;
  consignee: string;
  portOfLoading: string;
  portOfDestination: string;
  modeOfTransport: string;
  etd: string;
  eta: string;
  volume: number;
  grossWeight: number;
  qty: number;
  incomeDetails: CostSheetLineItem[];
  expenseDetails: CostSheetLineItem[];
};

export type CostSheetRecord = {
  id: string;
  jobNo: number;
  bookingId: string;
  bookingParty: string;
  shipper: string;
  consignee: string;
  portOfLoading: string;
  portOfDestination: string;
  modeOfTransport: string;
  etd: string;
  eta: string;
  volume: number;
  grossWeight: number;
  qty: number;
  incomeDetails: CostSheetLineItem[];
  expenseDetails: CostSheetLineItem[];
  totals: {
    aedIncome: number;
    aedExpense: number;
    aedProfit: number;
    usdIncome: number;
    usdExpense: number;
    usdProfit: number;
  };
  status: CostSheetStatus;
  createdAt: string;
  updatedAt: string;
};

export type CostSheetListQuery = {
  search?: string;
  status?: CostSheetStatus;
  page: number;
  limit: number;
  sortBy: "createdAt" | "jobNo" | "status";
  sortDir: "asc" | "desc";
};

export type CostSheetListResult = {
  items: CostSheetRecord[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};

export type CostSheetPayload = {
  jobNo: number;
  bookingId?: string;
  bookingParty?: string;
  shipper?: string;
  consignee?: string;
  portOfLoading?: string;
  portOfDestination?: string;
  modeOfTransport?: string;
  etd?: string;
  eta?: string;
  volume?: number;
  grossWeight?: number;
  qty?: number;
  incomeDetails: Array<{
    chargeDescriptionId?: string;
    chargeDescriptionName?: string;
    chargeDescriptionCode?: string;
    billingPartyId?: string;
    billingPartyName?: string;
    chargedPer: CostSheetChargedPer;
    qty: number;
    size: string;
    type: string;
    currency: CostSheetCurrency;
    rate: number;
    amount: number;
    remarks?: string;
  }>;
  expenseDetails: Array<{
    chargeDescriptionId?: string;
    chargeDescriptionName?: string;
    chargeDescriptionCode?: string;
    vendorId?: string;
    vendorName?: string;
    chargedPer: CostSheetChargedPer;
    qty: number;
    size: string;
    type: string;
    currency: CostSheetCurrency;
    rate: number;
    amount: number;
    remarks?: string;
  }>;
  status: CostSheetStatus;
};
