import { type ComponentType, useMemo, useState } from "react";
import { Download, Loader2, Search, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getApiErrorMessage } from "@/shared/api/http";
import { toast } from "@/shared/lib/toast";
import {
  useMasterBlDownload,
  useUploadMasterBl,
  useUploadVendorRow,
  useVendorDocumentJobOptions,
  useVendorDocumentsByJob,
  useVendorRowDownload,
} from "@/modules/document-upload/vendor-documents/hooks/useVendorDocuments";
import { cn } from "@/lib/utils";

function formatAmount(value: number) {
  return Number(value || 0).toFixed(2);
}

function renderActionIcon(
  isPending: boolean,
  Icon: ComponentType<{ className?: string }>,
) {
  return isPending ? (
    <Loader2 className="mr-2 size-4 animate-spin" />
  ) : (
    <Icon className="mr-2 size-4" />
  );
}

function getStatusBadge(status: string) {
  const normalized = String(status || "")
    .trim()
    .toLowerCase();

  if (normalized === "uploaded") {
    return {
      label: "Uploaded",
      variant: "secondary" as const,
      className:
        "border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    };
  }

  if (normalized === "failed") {
    return {
      label: "Failed",
      variant: "destructive" as const,
      className: "bg-destructive/10 text-destructive",
    };
  }

  if (normalized === "processing") {
    return {
      label: "Processing",
      variant: "secondary" as const,
      className:
        "border border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-300",
    };
  }

  return {
    label: "Pending",
    variant: "outline" as const,
    className:
      "border border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300",
  };
}

function FilePicker({
  inputId,
  file,
  onChange,
  buttonLabel,
}: {
  inputId: string;
  file: File | null;
  onChange: (file: File | null) => void;
  buttonLabel: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <input
        id={inputId}
        type="file"
        className="hidden"
        onChange={(event) => {
          onChange(event.target.files?.[0] ?? null);
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          const el = document.getElementById(
            inputId,
          ) as HTMLInputElement | null;
          el?.click();
        }}
      >
        {buttonLabel}
      </Button>
      <span className="truncate text-sm text-muted-foreground">
        {file?.name ?? "No file chosen"}
      </span>
    </div>
  );
}

export function VendorDocumentsPage() {
  const [selectedJobNo, setSelectedJobNo] = useState<string>("");
  const [activeJobNo, setActiveJobNo] = useState<number | null>(null);
  const [masterFile, setMasterFile] = useState<File | null>(null);
  const [vendorFiles, setVendorFiles] = useState<Record<string, File | null>>(
    {},
  );

  const { data: jobOptions = [], isLoading: isJobOptionsLoading } =
    useVendorDocumentJobOptions();

  const {
    data: jobDocumentData,
    isFetching: isJobDataLoading,
    isError: isJobDataError,
    error: jobDataError,
  } = useVendorDocumentsByJob(activeJobNo);

  const uploadMasterBl = useUploadMasterBl(activeJobNo);
  const uploadVendorRow = useUploadVendorRow(activeJobNo);
  const downloadMasterBl = useMasterBlDownload();
  const downloadVendorRow = useVendorRowDownload();

  const vendorRows = useMemo(
    () => jobDocumentData?.vendorDocuments ?? [],
    [jobDocumentData?.vendorDocuments],
  );

  function openDownload(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleSearch() {
    if (!selectedJobNo) {
      toast.warning("Select Job No first");
      return;
    }

    const nextJobNo = Number(selectedJobNo);
    if (!Number.isFinite(nextJobNo) || nextJobNo <= 0) {
      toast.error("Invalid Job No selected");
      return;
    }

    setActiveJobNo(nextJobNo);
    setMasterFile(null);
    setVendorFiles({});
  }

  async function handleUploadMasterBl() {
    if (activeJobNo === null) {
      toast.warning("Search and load a Job No first");
      return;
    }
    if (!masterFile) {
      toast.warning("Choose a file for Master BL upload");
      return;
    }

    try {
      await uploadMasterBl.mutateAsync(masterFile);
      toast.success("Master BL uploaded");
      setMasterFile(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleDownloadMasterBl() {
    if (activeJobNo === null) return;

    try {
      const url = await downloadMasterBl.mutateAsync(activeJobNo);
      openDownload(url);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleVendorUpload(rowKey: string) {
    if (activeJobNo === null) {
      toast.warning("Search and load a Job No first");
      return;
    }

    const file = vendorFiles[rowKey];
    if (!file) {
      toast.warning("Choose a vendor document file first");
      return;
    }

    try {
      await uploadVendorRow.mutateAsync({ rowKey, file });
      toast.success("Vendor document uploaded");
      setVendorFiles((prev) => ({ ...prev, [rowKey]: null }));
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleVendorDownload(rowKey: string) {
    if (activeJobNo === null) return;

    try {
      const url = await downloadVendorRow.mutateAsync({
        jobNo: activeJobNo,
        rowKey,
      });
      openDownload(url);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  function handleMasterFileSelection(file: File | null) {
    setMasterFile(file);
  }

  function handleVendorFileSelection(rowKey: string, file: File | null) {
    setVendorFiles((prev) => ({
      ...prev,
      [rowKey]: file,
    }));
  }

  return (
    <div className="space-y-6 pb-6">
      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold text-foreground">
              Vendor Documents Upload
            </h1>
            <p className="text-sm text-muted-foreground">
              Select a Job No, upload the Master BL, and manage vendor expense
              attachments in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-3 md:max-w-[560px] md:grid-cols-[minmax(220px,1fr)_170px] md:items-end">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Job No
              </div>
              <Select
                value={selectedJobNo}
                onValueChange={(value) => setSelectedJobNo(value ?? "")}
              >
                <SelectTrigger className="w-full bg-background">
                  <span
                    className={cn(!selectedJobNo && "text-muted-foreground")}
                  >
                    {selectedJobNo || "Select job number"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {isJobOptionsLoading ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Loading...
                    </div>
                  ) : jobOptions.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No Job No found
                    </div>
                  ) : (
                    jobOptions.map((option) => (
                      <SelectItem
                        key={option.jobNo}
                        value={String(option.jobNo)}
                      >
                        {option.jobNo}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <Button type="button" onClick={handleSearch} className="w-full">
              <Search className="mr-2 size-4" />
              Search
            </Button>
          </div>

          {isJobDataLoading ? (
            <div className="inline-flex items-center gap-2 rounded-md bg-background px-3 py-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Fetching vendor document details...
            </div>
          ) : null}
        </div>
      </section>

      {isJobDataError ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {getApiErrorMessage(jobDataError)}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="border-b bg-muted/30 px-4 py-3">
          <h2 className="text-lg font-semibold">Master BL Upload</h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Choose File</TableHead>
                <TableHead>Upload</TableHead>
                <TableHead>Master BL (File Name)</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="min-w-[260px]">
                  <FilePicker
                    inputId="master-bl-file"
                    file={masterFile}
                    onChange={handleMasterFileSelection}
                    buttonLabel="Choose File"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    onClick={handleUploadMasterBl}
                    disabled={
                      activeJobNo === null ||
                      !masterFile ||
                      uploadMasterBl.isPending
                    }
                  >
                    {renderActionIcon(uploadMasterBl.isPending, Upload)}
                    Upload Master BL
                  </Button>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    {jobDocumentData?.masterBlFileName || "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleDownloadMasterBl}
                    disabled={
                      activeJobNo === null ||
                      !jobDocumentData?.hasMasterBl ||
                      downloadMasterBl.isPending
                    }
                  >
                    {renderActionIcon(downloadMasterBl.isPending, Download)}
                    Download File
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="border-b bg-muted/30 px-4 py-3">
          <h2 className="text-lg font-semibold">Vendor Documents</h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="min-w-[240px]">File Upload</TableHead>
                <TableHead>Upload</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground"
                  >
                    {activeJobNo === null
                      ? "Search Job No to load vendor expense rows"
                      : "No expense details found for this Job No"}
                  </TableCell>
                </TableRow>
              ) : (
                vendorRows.map((row) => {
                  const pendingRowUpload =
                    uploadVendorRow.isPending &&
                    uploadVendorRow.variables?.rowKey === row.rowKey;
                  const pendingRowDownload =
                    downloadVendorRow.isPending &&
                    downloadVendorRow.variables?.rowKey === row.rowKey;
                  const statusBadge = getStatusBadge(row.status);

                  return (
                    <TableRow key={row.rowKey}>
                      <TableCell className="font-medium">
                        {row.vendorName || "-"}
                      </TableCell>
                      <TableCell>{row.description || "-"}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatAmount(row.amount)}
                      </TableCell>
                      <TableCell className="min-w-[240px]">
                        <FilePicker
                          inputId={`vendor-file-${row.rowKey}`}
                          file={vendorFiles[row.rowKey] ?? null}
                          onChange={(file) => {
                            handleVendorFileSelection(row.rowKey, file);
                          }}
                          buttonLabel="Choose File"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            void handleVendorUpload(row.rowKey);
                          }}
                          disabled={
                            activeJobNo === null ||
                            !vendorFiles[row.rowKey] ||
                            pendingRowUpload
                          }
                        >
                          {renderActionIcon(pendingRowUpload, Upload)}
                          Upload
                        </Button>
                      </TableCell>
                      <TableCell>{row.fileName || "-"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={statusBadge.variant}
                          className={statusBadge.className}
                        >
                          {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            void handleVendorDownload(row.rowKey);
                          }}
                          disabled={
                            row.status !== "Uploaded" || pendingRowDownload
                          }
                        >
                          {renderActionIcon(pendingRowDownload, Download)}
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
