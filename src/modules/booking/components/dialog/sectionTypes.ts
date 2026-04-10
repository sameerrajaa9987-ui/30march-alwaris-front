import type {
  SeaChargedPer,
  SeaContainerSize,
  SeaContainerType,
  SeaCurrency,
} from "@/modules/booking/types";

export type SeaBookingIncomeDetailForm = {
  incomeBillingParty: string;
  chargeDescription: string;
  chargedPer: SeaChargedPer | "";
  qty: number;
  rate: number;
  currency: SeaCurrency | "";
  size: SeaContainerSize | "";
  type: SeaContainerType | "";
  amount: number;
  exRate: number;
  remarks: string;
};

export type SeaBookingExpenseDetailForm = {
  vendorName: string;
  chargeDescription: string;
  chargedPer: SeaChargedPer | "";
  qty: number;
  rate: number;
  currency: SeaCurrency | "";
  size: SeaContainerSize | "";
  type: SeaContainerType | "";
  amount: number;
  exRate: number;
  invoiceNo: string;
  date: string;
  remarks: string;
};
