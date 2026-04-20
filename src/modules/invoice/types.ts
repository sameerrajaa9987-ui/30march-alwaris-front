export type InvoiceType = "Proforma" | "Tax Invoice";
export type InvoiceCurrency = "AED" | "USD";
export type InvoicePaymentType = "CHEQUE" | "CASH" | "BANK TRANSFER";

export type InvoiceJobOption = {
  jobNo: number;
};

export type InvoiceLineItem = {
  id: string;
  lineNo: number;
  jobNo: number;
  invoiceNo: string;
  jobDate: string;
  code: string;
  description: string;
  chargedPer: string;
  currency: InvoiceCurrency;
  size: string;
  type: string;
  qty: number;
  rate: number;
  amount: number;
  serviceCode: string;
  gstVat: number;
  gstVatAmount: number;
  cgst: number;
  cgstAmount: number;
  sgst: number;
  sgstAmount: number;
  igst: number;
  igstAmount: number;
  wht: number;
  whtAmount: number;
  totalAmount: number;
  remark: string;
  exRate: number;
};

export type InvoicePayment = {
  id: string;
  vocNo: string;
  vocDate: string;
  invoice: string;
  payAmount: number;
  tdsAmount: number;
  clientBank: string;
  bankBranch: string;
  clientAcNo: string;
  payType: InvoicePaymentType;
  chequeNo: string;
  ourBank: string;
  tokenNo: string;
  paymentDate: string;
};

export type InvoiceRecord = {
  id: string;
  jobNo: number;
  invoiceType: InvoiceType;
  bookingId?: string;
  costSheetId?: string;
  invoiceNo: string;
  invoiceDate: string;
  customerName: string;
  jobDate: string;
  branch: string;
  amount: number;
  tax: number;
  totalAmount: number;
  payAmount: number;
  tdsAmount: number;
  balanceAmount: number;
  voyage: string;
  vesselName: string;
  pol: string;
  fpod: string;
  cgst: number;
  sgst: number;
  igst: number;
  exRate: number;
  actualJob: number;
  actualInvoice: number;
  credit: number;
  creditDate: string;
  remarks: string;
  createdBy: string;
  checker: string;
  checkedBy: string;
  creditDays: number;
  wht: number;
  actualTotal: number;
  payableAt: InvoiceCurrency;
  bankName: string;
  partyName: string;
  lineItems: InvoiceLineItem[];
  payments: InvoicePayment[];
  createdAt?: string;
  updatedAt?: string;
};

export type InvoiceTableRow = {
  id: string;
  jobNo: number;
  code: string;
  customerName: string;
  jobDate: string;
  invoiceNo: string;
  invoiceDate: string;
  branch: string;
  amount: number;
  tax: number;
  totalAmount: number;
  payAmount: number;
  tdsAmount: number;
  balanceAmount: number;
  voyage: string;
  vesselName: string;
  pol: string;
  fpod: string;
  cgst: number;
  sgst: number;
  igst: number;
  exRate: number;
  actualJob: number;
  actualInvoice: number;
  credit: number;
  creditDate: string;
  remarks: string;
  createdBy: string;
  checker: string;
  checkedBy: string;
  creditDays: number;
  wht: number;
  actualTotal: number;
};

export type InvoiceSearchResult = {
  bookingId: string;
  costSheetId: string;
  invoiceType: InvoiceType;
  tableRows: InvoiceTableRow[];
  selectedInvoice: InvoiceRecord;
  lineItems: InvoiceLineItem[];
  payableSection: {
    payableAt: InvoiceCurrency;
    bankName: string;
  };
  paymentTypeOptions: InvoicePaymentType[];
  bankOptions: string[];
};

export type InvoicePayload = Omit<InvoiceRecord, "id">;

export type InvoiceListQuery = {
  search?: string;
  invoiceType?: InvoiceType;
  jobNo?: number;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "jobNo" | "invoiceDate" | "invoiceNo";
  sortDir?: "asc" | "desc";
};

export type InvoiceListResult = {
  items: InvoiceRecord[];
  meta: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    limit: number;
  };
};
