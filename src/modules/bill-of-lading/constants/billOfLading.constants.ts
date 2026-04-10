import type {
  BillOfLadingCommodity,
  BillOfLadingConsignmentDetails,
  BillOfLadingContainerDetailPayload,
  BillOfLadingContainerSize,
  BillOfLadingContainerType,
  BillOfLadingStatus,
} from "@/modules/bill-of-lading/types";

export const BILL_OF_LADING_STATUS_OPTIONS: BillOfLadingStatus[] = [
  "Draft",
  "RFS",
  "SOB",
];

export const BILL_OF_LADING_SIZE_OPTIONS: BillOfLadingContainerSize[] = [
  "20",
  "40",
  "45",
];

export const BILL_OF_LADING_TYPE_OPTIONS: BillOfLadingContainerType[] = [
  "DC",
  "DV",
  "FR",
  "GP",
  "GV",
  "HC",
  "HD",
  "HQ",
  "ISO",
  "OT",
  "RF",
  "SD",
  "SR",
];

export const BILL_OF_LADING_COMMODITY_OPTIONS: BillOfLadingCommodity[] = [
  "General",
  "Hazardous",
  "ODC",
];

export function getDefaultBillOfLadingConsignmentDetails(): BillOfLadingConsignmentDetails {
  const today = new Date().toISOString().split("T")[0] ?? "";

  return {
    shipper: "",
    consignee: "",
    notifyParty: "",
    marksAndNos: "",
    descriptionOfGoods: "",
    deliveryAgent: "",
    placeOfAcceptance: "",
    portOfLoading: "",
    placeOfDischarge: "",
    portOfDelivery: "",
    consigneeEmail: "",
    notifyEmail: "",
    routePlaceOfTranshipment: "",
    package: "",
    measurement: "",
    freeDaysAgreed: "",
    vesselVoyage: "",
    modeMeansOf: "",
    freightPayable: "",
    freightAmount: 0,
    place: "",
    date: today,
    dateOfIssue: today,
  };
}

export function getDefaultContainerForm(): BillOfLadingContainerDetailPayload {
  return {
    containerNo: "",
    size: "20",
    type: "GP",
    agentSeal: "",
    customSeal: "",
    piece: 0,
    countPackage: "",
    commodity: "General",
    netWeight: 0,
    grossWeight: 0,
    shippingBill: "",
    cbm: 0,
    hbl: "",
  };
}
