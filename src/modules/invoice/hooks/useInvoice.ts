import { useMutation, useQuery } from "@tanstack/react-query";
import { createResourceHooks } from "@/modules/common/shared-crud/createResourceHooks";
import {
  createInvoice,
  deleteInvoice,
  getInvoiceJobOptions,
  listInvoices,
  searchInvoiceData,
  updateInvoice,
} from "@/modules/invoice/api/invoiceApi";
import type {
  InvoiceListQuery,
  InvoiceListResult,
  InvoicePayload,
  InvoiceType,
} from "@/modules/invoice/types";

const invoiceCrud = createResourceHooks<
  InvoiceListQuery,
  InvoicePayload,
  InvoiceListResult
>("invoices", {
  list: listInvoices,
  create: createInvoice,
  update: updateInvoice,
  remove: deleteInvoice,
});

export const useInvoices = invoiceCrud.useList;
export const useCreateInvoice = invoiceCrud.useCreate;
export const useUpdateInvoice = invoiceCrud.useUpdate;

export function useInvoiceJobOptions() {
  return useQuery({
    queryKey: ["invoices", "job-options"],
    queryFn: getInvoiceJobOptions,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchInvoiceMutation() {
  return useMutation({
    mutationFn: ({
      jobNo,
      invoiceType,
    }: {
      jobNo: number;
      invoiceType: InvoiceType;
    }) => searchInvoiceData(jobNo, invoiceType),
  });
}
