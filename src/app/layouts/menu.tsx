import {
  BookOpen,
  ClipboardList,
  FileText,
  Upload,
  Calculator,
  Receipt,
  Landmark,
  Settings,
} from "lucide-react";

export type MenuItem = {
  label: string;
  to?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
};

export const MENU: MenuItem[] = [
  {
    label: "Masters",
    icon: BookOpen,
    children: [
      { label: "Employee", to: "/masters/employee" },
      {
        label: "Customer",
        children: [
          { label: "Type", to: "/masters/type" },
          { label: "Details", to: "/masters/details" },
        ],
      },
      {
        label: "Vendor / Agent",
        children: [
          { label: "Type", to: "/masters/vendor/type" },
          { label: "Details", to: "/masters/vendor/details" },
        ],
      },
      { label: "Vessel", to: "/masters/vessel" },
      { label: "Port", to: "/masters/port" },
      { label: "Terms", to: "/masters/terms" },
      { label: "Service", to: "/masters/service" },
      { label: "Shipment", to: "/masters/shipment" },
      { label: "Line Of BIX", to: "/masters/line-of-bix" },
      { label: "Terms & Condition", to: "/masters/terms-condition" },
      {
        label: "Tariff",
        children: [
          { label: "Tariff Description", to: "/masters/tariff/description" },
          { label: "Tariff Master", to: "/masters/tariff/master" },
        ],
      },
      { label: "Exchange Rate", to: "/masters/exchange-rate" },
    ],
  },
  {
    label: "Booking",
    icon: ClipboardList,
    children: [
      { label: "Sea Booking", to: "/booking/sea" },
      { label: "Air Booking", to: "/booking/air" },
    ],
  },
  { label: "Bill of Lading", to: "/bill-of-lading", icon: FileText },
  {
    label: "Document Upload",
    to: "/document-upload/vendor-documents",
    icon: Upload,
  },
  {
    label: "Cost Sheet",
    icon: Calculator,
    children: [
      { label: "Create Cost Sheet", to: "/cost-sheet/create" },
      { label: "Cost Sheet Approval", to: "/cost-sheet/approval" },
    ],
  },
  {
    label: "Create Invoice",
    icon: Receipt,
    children: [
      { label: "Income Invoice", to: "/create-invoice/income" },
      { label: "Tax / Proforma Invoice", to: "/create-invoice/tax-proforma" },
    ],
  },
  {
    label: "Advance",
    icon: Landmark,
    children: [
      { label: "Advance Payment", to: "/advance/payment" },
      { label: "Advance Receipt", to: "/advance/receipt" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "User Management", to: "/settings/user-management" },
      { label: "System Config", to: "/settings/system-config" },
    ],
  },
];
