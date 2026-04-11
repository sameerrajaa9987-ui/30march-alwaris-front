import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMasterBlDownloadUrl,
  getVendorDocumentJobOptions,
  getVendorDocumentsByJob,
  getVendorRowDownloadUrl,
  uploadMasterBlFile,
  uploadVendorRowFile,
} from "@/modules/document-upload/vendor-documents/api/vendorDocumentsApi";

const vendorDocumentsKeys = {
  all: ["vendor-documents"] as const,
  jobOptions: () => [...vendorDocumentsKeys.all, "job-options"] as const,
  byJob: (jobNo: number | null) =>
    [...vendorDocumentsKeys.all, "by-job", jobNo] as const,
};

function requireJobNo(jobNo: number | null) {
  if (jobNo === null) {
    throw new Error("Job No is required");
  }
  return jobNo;
}

export function useVendorDocumentJobOptions() {
  return useQuery({
    queryKey: vendorDocumentsKeys.jobOptions(),
    queryFn: getVendorDocumentJobOptions,
  });
}

export function useVendorDocumentsByJob(jobNo: number | null) {
  return useQuery({
    queryKey: vendorDocumentsKeys.byJob(jobNo),
    queryFn: () => getVendorDocumentsByJob(requireJobNo(jobNo)),
    enabled: jobNo !== null,
  });
}

export function useUploadMasterBl(jobNo: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadMasterBlFile(requireJobNo(jobNo), file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: vendorDocumentsKeys.byJob(jobNo),
      });
    },
  });
}

export function useUploadVendorRow(jobNo: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rowKey, file }: { rowKey: string; file: File }) =>
      uploadVendorRowFile(requireJobNo(jobNo), rowKey, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: vendorDocumentsKeys.byJob(jobNo),
      });
    },
  });
}

export function useMasterBlDownload() {
  return useMutation({
    mutationFn: (jobNo: number) => getMasterBlDownloadUrl(jobNo),
  });
}

export function useVendorRowDownload() {
  return useMutation({
    mutationFn: ({ jobNo, rowKey }: { jobNo: number; rowKey: string }) =>
      getVendorRowDownloadUrl(jobNo, rowKey),
  });
}
