import type { SeaBookingFormState } from "@/modules/booking/types";

export type SeaBookingDialogInputField = {
  key: keyof SeaBookingFormState;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "date";
  min?: number;
  step?: number;
  className?: string;
};

export const SEA_BOOKING_PARTY_FIELDS: Array<SeaBookingDialogInputField> = [
  {
    key: "shipper",
    label: "Shipper",
    placeholder: "Enter Shipper",
  },
  {
    key: "consignee",
    label: "Consignee",
    placeholder: "Enter Consignee",
  },
];

export const SEA_BOOKING_REFERENCE_FIELDS: Array<SeaBookingDialogInputField> = [
  {
    key: "mbl",
    label: "MBL",
    placeholder: "Enter MBL",
  },
  {
    key: "orderReference",
    label: "Order Reference",
    placeholder: "Enter Order Ref",
  },
];

export const SEA_BOOKING_QTY_FIELD: SeaBookingDialogInputField = {
  key: "qty",
  label: "Qty",
  type: "number",
  min: 1,
};

export const SEA_BOOKING_CONTAINER_NO_FIELD: SeaBookingDialogInputField = {
  key: "containerNo",
  label: "Container No",
  placeholder: "C001, C002, C003",
  className: "md:col-span-2",
};

export const SEA_BOOKING_COMMODITY_FIELD: SeaBookingDialogInputField = {
  key: "commodity",
  label: "Commodity (Description)",
  placeholder: "Enter Commodity",
  className: "md:col-span-2",
};

export const SEA_BOOKING_WEIGHT_FIELDS: Array<SeaBookingDialogInputField> = [
  {
    key: "netWeight",
    label: "Net Weight (KGS)",
    type: "number",
    min: 0,
  },
  {
    key: "grossWeight",
    label: "Gross Weight (KGS)",
    type: "number",
    min: 0,
  },
  {
    key: "volume",
    label: "Volume (CBM)",
    type: "number",
    min: 0,
    step: 0.01,
  },
];

export const SEA_BOOKING_SCHEDULE_FIELDS: Array<SeaBookingDialogInputField> = [
  {
    key: "voyage",
    label: "Voyage",
    placeholder: "Enter Voyage",
  },
  {
    key: "etd",
    label: "ETD",
    type: "date",
  },
  {
    key: "eta",
    label: "ETA",
    type: "date",
  },
];

export const SEA_BOOKING_HBL_FIELD: SeaBookingDialogInputField = {
  key: "hbl",
  label: "HBL",
  placeholder: "Enter HBL",
  className: "md:col-span-2",
};
