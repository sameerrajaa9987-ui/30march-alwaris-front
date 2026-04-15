export type SeaBookingIncomeDetail = {
  id: string;
  incomeBillingPartyId: string;
  incomeBillingPartyName?: string;
  chargeDescriptionId: string;
  chargeDescriptionName?: string;
  chargedPer: SeaChargedPer;
  qty: number;
  rate: number;
  currency: SeaCurrency;
  size: SeaContainerSize;
  type: SeaContainerType;
  amount: number;
  exRate: number;
  remarks: string;
};

export type SeaBookingIncomeDetailPayload = Omit<SeaBookingIncomeDetail, "id">;

export type SeaBookingExpenseDetail = {
  id: string;
  vendorId: string;
  vendorName?: string;
  chargeDescriptionId: string;
  chargeDescriptionName?: string;
  chargedPer: SeaChargedPer;
  qty: number;
  rate: number;
  currency: SeaCurrency;
  size: SeaContainerSize;
  type: SeaContainerType;
  amount: number;
  exRate: number;
  invoiceNo: string;
  date: string;
  remarks: string;
};

export type SeaBookingExpenseDetailPayload = Omit<
  SeaBookingExpenseDetail,
  "id"
>;

export type SeaTransportMode = "Air" | "Sea" | "Road";
export type SeaExportImport = "Export" | "Import" | "Cross Trade";
export type SeaLine = "ACL" | "AGL" | "ASR";
export type SeaBookingStatus = "Pending" | "Done" | "Cancel";
export type SeaCurrency = "USD" | "AED";
export type SeaChargedPer = "DOCS" | "CONT";
export type SeaContainerSize = "20" | "40" | "45";
export type SeaContainerType =
  | "DC"
  | "DV"
  | "FR"
  | "GP"
  | "GV"
  | "HC"
  | "HD"
  | "HQ"
  | "ISO"
  | "OT"
  | "RF"
  | "SD"
  | "SR";

export type SeaBookingRecord = {
  generatedReference: string;
  containerNo: string;
  qty: number;
  size: SeaContainerSize;
  type: SeaContainerType;
  commodity: string;
  netWeight: number;
  grossWeight: number;
  volume: number;
  vessel?: string;
  vesselName?: string;
  voyage: string;
  etd: string;
  eta: string;
  hbl: string;
  remarks: string;
};

export type SeaBooking = {
  id: string;
  jobNo: number;
  jobDate: string;
  rateAgreedBy?: string;
  rateAgreedByName?: string;
  bookingParty?: string;
  bookingPartyName?: string;
  kindAttention?: string;
  kindAttentionName?: string;
  shipper: string;
  consignee: string;
  modeOfTransport: SeaTransportMode;
  exportImport: SeaExportImport;
  portOfLoading?: string;
  portOfLoadingName?: string;
  portOfDestination?: string;
  portOfDestinationName?: string;
  line?: SeaLine;
  status: SeaBookingStatus;
  terms?: string;
  termsName?: string;
  lineOfBix?: string;
  lineOfBixName?: string;
  mbl: string;
  orderReference: string;
  defaultCurrency: SeaCurrency;
  billingParty?: string;
  billingPartyName?: string;
  incomeDetails?: SeaBookingIncomeDetailPayload[];
  expenseDetails?: SeaBookingExpenseDetailPayload[];
  shipmentDetails?: SeaBookingRecord[];
  createdAt: string;
  updatedAt: string;
};

export type SeaBookingListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "jobNo" | "jobDate";
  sortDir?: "asc" | "desc";
};

export type SeaBookingTableQuery = {
  search?: string;
  page: number;
  limit: number;
  sortBy: "createdAt";
  sortDir: "desc";
};

export type SeaBookingListResult = {
  items: SeaBooking[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};

export type SeaBookingPayload = {
  jobDate: string;
  rateAgreedBy?: string;
  bookingParty?: string;
  kindAttention?: string;
  shipper: string;
  consignee: string;
  modeOfTransport: SeaTransportMode;
  exportImport: SeaExportImport;
  portOfLoading?: string;
  portOfDestination?: string;
  line?: SeaLine;
  status: SeaBookingStatus;
  terms?: string;
  lineOfBix?: string;
  mbl: string;
  orderReference: string;
  defaultCurrency: SeaCurrency;
  billingParty?: string;
  shipmentDetails: SeaBookingRecord[];
  incomeDetails?: SeaBookingIncomeDetailPayload[];
  expenseDetails?: SeaBookingExpenseDetailPayload[];
};

export type SeaBookingFormState = {
  jobDate: string;
  rateAgreedBy: string;
  bookingParty: string;
  kindAttention: string;
  shipper: string;
  consignee: string;
  modeOfTransport: SeaTransportMode | "";
  exportImport: SeaExportImport | "";
  portOfLoading: string;
  portOfDestination: string;
  line: SeaLine | "";
  status: SeaBookingStatus | "";
  terms: string;
  lineOfBix: string;
  mbl: string;
  orderReference: string;
  generatedReference: string;
  containerNo: string;
  qty: number;
  size: SeaContainerSize | "";
  type: SeaContainerType | "";
  commodity: string;
  netWeight: number;
  grossWeight: number;
  volume: number;
  vessel: string;
  voyage: string;
  etd: string;
  eta: string;
  currency: SeaCurrency | "";
  billingParty: string;
  hbl: string;
  remarks: string;
};

export type SeaBookingRow = SeaBookingFormState & { id: string };

export type SeaBookingFiltersValue = {
  search: string;
};
