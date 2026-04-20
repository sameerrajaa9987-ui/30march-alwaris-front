import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import { http } from "@/shared/api/http";
import type {
  InvoiceJobOption,
  InvoiceListQuery,
  InvoiceListResult,
  InvoicePayload,
  InvoiceRecord,
  InvoiceSearchResult,
  InvoiceType,
} from "@/modules/invoice/types";

const invoiceApi = createResourceApi<
  InvoiceRecord,
  InvoiceListQuery,
  InvoicePayload
>("/invoices");

export const listInvoices = async (query: InvoiceListQuery) =>
  invoiceApi.list(query) satisfies Promise<InvoiceListResult>;

export const createInvoice = (payload: InvoicePayload) =>
  invoiceApi.create(payload);

export const updateInvoice = (id: string, payload: Partial<InvoicePayload>) =>
  invoiceApi.update(id, payload);

export const deleteInvoice = (id: string) => invoiceApi.remove(id);

export async function getInvoiceJobOptions() {
  const res = await http.get<{ data: InvoiceJobOption[] }>(
    "/invoices/job-options",
  );
  return res.data.data;
}

export async function searchInvoiceData(
  jobNo: number,
  invoiceType: InvoiceType,
) {
  const res = await http.get<{ data: InvoiceSearchResult }>(
    "/invoices/search",
    {
      params: { jobNo, invoiceType },
    },
  );

  return res.data.data;
}
