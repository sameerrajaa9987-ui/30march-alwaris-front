import axios from "axios";
import { http } from "@/shared/api/http";
import type {
  VendorDocumentJobOption,
  VendorDocumentsByJob,
} from "@/modules/document-upload/vendor-documents/types";

const DEFAULT_CONTENT_TYPE = "application/octet-stream";

type PresignUploadResult = {
  uploadUrl: string;
  expiresIn: number;
  key: string;
  fileName: string;
  mimeType: string;
  size: number;
};

type FileUploadPayload = {
  fileName: string;
  contentType: string;
  size: number;
};

type FileCompletePayload = {
  key: string;
  fileName: string;
  mimeType: string;
  size: number;
};

function getFileContentType(file: File) {
  return file.type || DEFAULT_CONTENT_TYPE;
}

function buildFileUploadPayload(file: File): FileUploadPayload {
  return {
    fileName: file.name,
    contentType: getFileContentType(file),
    size: file.size,
  };
}

function buildFileCompletePayload(
  file: File,
  key: string,
): FileCompletePayload {
  return {
    key,
    fileName: file.name,
    mimeType: getFileContentType(file),
    size: file.size,
  };
}

async function uploadToS3PresignedUrl(uploadUrl: string, file: File) {
  await axios.put(uploadUrl, file, {
    headers: {
      "Content-Type": getFileContentType(file),
    },
  });
}

export async function getVendorDocumentJobOptions() {
  const res = await http.get<{ data: VendorDocumentJobOption[] }>(
    "/vendor-documents/job-options",
  );
  return res.data.data;
}

export async function getVendorDocumentsByJob(jobNo: number) {
  const res = await http.get<{ data: VendorDocumentsByJob }>(
    `/vendor-documents/by-job/${jobNo}`,
  );
  return res.data.data;
}

export async function uploadMasterBlFile(jobNo: number, file: File) {
  const uploadPayload = buildFileUploadPayload(file);
  const presignRes = await http.post<{ data: PresignUploadResult }>(
    `/vendor-documents/${jobNo}/master-bl/presign`,
    uploadPayload,
  );
  const presign = presignRes.data.data;

  await uploadToS3PresignedUrl(presign.uploadUrl, file);

  const res = await http.post<{ data: { fileName: string } }>(
    `/vendor-documents/${jobNo}/master-bl/complete`,
    buildFileCompletePayload(file, presign.key),
  );
  return res.data.data;
}

export async function getMasterBlDownloadUrl(jobNo: number) {
  const res = await http.get<{ data: { downloadUrl: string } }>(
    `/vendor-documents/${jobNo}/master-bl/download`,
  );
  return res.data.data.downloadUrl;
}

export async function uploadVendorRowFile(
  jobNo: number,
  rowKey: string,
  file: File,
) {
  const uploadPayload = buildFileUploadPayload(file);
  const encodedRowKey = encodeURIComponent(rowKey);
  const presignRes = await http.post<{ data: PresignUploadResult }>(
    `/vendor-documents/${jobNo}/vendor-row/${encodedRowKey}/presign`,
    uploadPayload,
  );
  const presign = presignRes.data.data;

  await uploadToS3PresignedUrl(presign.uploadUrl, file);

  const res = await http.post<{ data: { fileName: string; rowKey: string } }>(
    `/vendor-documents/${jobNo}/vendor-row/${encodedRowKey}/complete`,
    buildFileCompletePayload(file, presign.key),
  );
  return res.data.data;
}

export async function getVendorRowDownloadUrl(jobNo: number, rowKey: string) {
  const res = await http.get<{ data: { downloadUrl: string } }>(
    `/vendor-documents/${jobNo}/vendor-row/${encodeURIComponent(rowKey)}/download`,
  );
  return res.data.data.downloadUrl;
}
