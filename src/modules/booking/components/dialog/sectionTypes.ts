import type {
  SeaChargedPer,
  SeaContainerSize,
  SeaContainerType,
  SeaCurrency,
} from "@/modules/booking/types";

export type SeaBookingIncomeDetailForm = {
  incomeBillingPartyId: string;
  chargeDescriptionId: string;
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
  vendorId: string;
  chargeDescriptionId: string;
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
