export type VendorDocumentJobOption = {
  jobNo: number;
};

export type VendorDocumentRow = {
  rowKey: string;
  rowIndex: number;
  vendorNameId: string;
  vendorName: string;
  descriptionId: string;
  description: string;
  amount: number;
  fileName: string;
  uploadedAt: string | null;
  status: "Uploaded" | "Pending";
};

export type VendorDocumentsByJob = {
  jobNo: number;
  masterBlFileName: string;
  masterBlUploadedAt: string | null;
  hasMasterBl: boolean;
  vendorDocuments: VendorDocumentRow[];
};
