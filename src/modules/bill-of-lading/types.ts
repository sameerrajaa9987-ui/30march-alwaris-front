export type BillOfLadingStatus = "Draft" | "RFS" | "SOB";

export type BillOfLadingContainerSize = "20" | "40" | "45";

export type BillOfLadingContainerType =
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

export type BillOfLadingCommodity = "General" | "Hazardous" | "ODC";

export type BillOfLadingContainerDetailPayload = {
  containerNo: string;
  size: BillOfLadingContainerSize;
  type: BillOfLadingContainerType;
  agentSeal: string;
  customSeal: string;
  piece: number;
  countPackage: string;
  commodity: BillOfLadingCommodity;
  netWeight: number;
  grossWeight: number;
  shippingBill: string;
  cbm: number;
  hbl: string;
};

export type BillOfLadingContainerRow = BillOfLadingContainerDetailPayload & {
  id: string;
};

export type BillOfLadingConsignmentDetails = {
  shipper: string;
  consignee: string;
  notifyParty: string;
  marksAndNos: string;
  descriptionOfGoods: string;
  deliveryAgent: string;
  placeOfAcceptance: string;
  portOfLoading: string;
  placeOfDischarge: string;
  portOfDelivery: string;
  consigneeEmail: string;
  notifyEmail: string;
  routePlaceOfTranshipment: string;
  package: string;
  measurement: string;
  freeDaysAgreed: string;
  vesselVoyage: string;
  modeMeansOf: string;
  freightPayable: string;
  freightAmount: number;
  place: string;
  date: string;
  dateOfIssue: string;
};

export type BillOfLading = {
  id: string;
  hblNo: number;
  jobNo: number;
  referenceNo: string;
  status: BillOfLadingStatus;
  blNumber: string;
  consignmentDetails: BillOfLadingConsignmentDetails;
  containerDetails: BillOfLadingContainerDetailPayload[];
  createdAt: string;
  updatedAt: string;
};

export type BillOfLadingPayload = {
  jobNo: number;
  referenceNo: string;
  status: BillOfLadingStatus;
  blNumber: string;
  consignmentDetails: BillOfLadingConsignmentDetails;
  containerDetails: BillOfLadingContainerDetailPayload[];
};

export type BillOfLadingListQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "hblNo" | "jobNo";
  sortDir?: "asc" | "desc";
};

export type BillOfLadingTableQuery = {
  search?: string;
  page: number;
  limit: number;
  sortBy: "createdAt";
  sortDir: "desc";
};

export type BillOfLadingListResult = {
  items: BillOfLading[];
  total: number;
};

export type BillOfLadingJobContainerOption = {
  referenceNo: string;
  containerNo: string;
};

export type BillOfLadingJobOption = {
  jobNo: number;
  references: string[];
  containers: BillOfLadingJobContainerOption[];
  shipper: string;
  consignee: string;
  portOfLoading: string;
  portOfDelivery: string;
};

export type BillOfLadingFiltersValue = {
  search: string;
};
