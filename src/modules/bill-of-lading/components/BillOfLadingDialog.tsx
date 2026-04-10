import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ResourceDialog } from "@/modules/common/shared-crud/ResourceDialog";
import { Field } from "@/modules/bill-of-lading/components/Field";
import {
  BILL_OF_LADING_COMMODITY_OPTIONS,
  BILL_OF_LADING_SIZE_OPTIONS,
  BILL_OF_LADING_STATUS_OPTIONS,
  BILL_OF_LADING_TYPE_OPTIONS,
  getDefaultBillOfLadingConsignmentDetails,
  getDefaultContainerForm,
} from "@/modules/bill-of-lading/constants/billOfLading.constants";
import {
  useBillOfLadingJobOptions,
  useCreateBillOfLading,
  useGenerateBlNumber,
  useUpdateBillOfLading,
} from "@/modules/bill-of-lading/hooks/useBillOfLading";
import {
  billOfLadingContainerSchema,
  billOfLadingFormSchema,
} from "@/modules/bill-of-lading/validations/billOfLading.validation";
import type {
  BillOfLading,
  BillOfLadingConsignmentDetails,
  BillOfLadingContainerDetailPayload,
  BillOfLadingContainerRow,
  BillOfLadingPayload,
  BillOfLadingStatus,
} from "@/modules/bill-of-lading/types";
import { toast } from "@/shared/lib/toast";

interface BillOfLadingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: BillOfLading | null;
  onSuccess?: () => void;
}

function buildLocalRowId() {
  return `ctr-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toDateInput(value?: string) {
  if (!value) return "";
  return value.split("T")[0] ?? value;
}

function hydrateContainerRows(
  rows: BillOfLadingContainerDetailPayload[],
): BillOfLadingContainerRow[] {
  return rows.map((row) => ({
    ...row,
    id: buildLocalRowId(),
  }));
}

function ConsignmentDetailsSection({
  consignmentDetails,
  updateConsignmentDetailsField,
}: {
  consignmentDetails: BillOfLadingConsignmentDetails;
  updateConsignmentDetailsField: <
    K extends keyof BillOfLadingConsignmentDetails,
  >(
    key: K,
    value: BillOfLadingConsignmentDetails[K],
  ) => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-3">
      <h3 className="text-sm font-semibold">Consignment Details</h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field label="Shipper">
          <Input
            value={consignmentDetails.shipper}
            onChange={(e) =>
              updateConsignmentDetailsField("shipper", e.target.value)
            }
          />
        </Field>
        <Field label="Consignee">
          <Input
            value={consignmentDetails.consignee}
            onChange={(e) =>
              updateConsignmentDetailsField("consignee", e.target.value)
            }
          />
        </Field>
        <Field label="Notify">
          <Input
            value={consignmentDetails.notifyParty}
            onChange={(e) =>
              updateConsignmentDetailsField("notifyParty", e.target.value)
            }
          />
        </Field>
        <Field label="Marks and Nos">
          <Input
            value={consignmentDetails.marksAndNos}
            onChange={(e) =>
              updateConsignmentDetailsField("marksAndNos", e.target.value)
            }
          />
        </Field>

        <Field label="Description Goods" className="md:col-span-2">
          <Input
            value={consignmentDetails.descriptionOfGoods}
            onChange={(e) =>
              updateConsignmentDetailsField(
                "descriptionOfGoods",
                e.target.value,
              )
            }
          />
        </Field>
        <Field label="Delivery Agent">
          <Input
            value={consignmentDetails.deliveryAgent}
            onChange={(e) =>
              updateConsignmentDetailsField("deliveryAgent", e.target.value)
            }
          />
        </Field>
        <Field label="Place Of Acceptance">
          <Input
            value={consignmentDetails.placeOfAcceptance}
            onChange={(e) =>
              updateConsignmentDetailsField("placeOfAcceptance", e.target.value)
            }
          />
        </Field>

        <Field label="Port Of Loading">
          <Input
            value={consignmentDetails.portOfLoading}
            onChange={(e) =>
              updateConsignmentDetailsField("portOfLoading", e.target.value)
            }
          />
        </Field>
        <Field label="Place Of Discharge">
          <Input
            value={consignmentDetails.placeOfDischarge}
            onChange={(e) =>
              updateConsignmentDetailsField("placeOfDischarge", e.target.value)
            }
          />
        </Field>
        <Field label="Port Of Delivery">
          <Input
            value={consignmentDetails.portOfDelivery}
            onChange={(e) =>
              updateConsignmentDetailsField("portOfDelivery", e.target.value)
            }
          />
        </Field>
        <Field label="Route/Place Of Transhipment">
          <Input
            value={consignmentDetails.routePlaceOfTranshipment}
            onChange={(e) =>
              updateConsignmentDetailsField(
                "routePlaceOfTranshipment",
                e.target.value,
              )
            }
          />
        </Field>

        <Field label="Consignee Email">
          <Input
            value={consignmentDetails.consigneeEmail}
            onChange={(e) =>
              updateConsignmentDetailsField("consigneeEmail", e.target.value)
            }
          />
        </Field>
        <Field label="Notify Email">
          <Input
            value={consignmentDetails.notifyEmail}
            onChange={(e) =>
              updateConsignmentDetailsField("notifyEmail", e.target.value)
            }
          />
        </Field>
        <Field label="Vessel and Voyage">
          <Input
            value={consignmentDetails.vesselVoyage}
            onChange={(e) =>
              updateConsignmentDetailsField("vesselVoyage", e.target.value)
            }
          />
        </Field>
        <Field label="Mode/Means Of">
          <Input
            value={consignmentDetails.modeMeansOf}
            onChange={(e) =>
              updateConsignmentDetailsField("modeMeansOf", e.target.value)
            }
          />
        </Field>

        <Field label="Package">
          <Input
            value={consignmentDetails.package}
            onChange={(e) =>
              updateConsignmentDetailsField("package", e.target.value)
            }
          />
        </Field>
        <Field label="Measurement">
          <Input
            value={consignmentDetails.measurement}
            onChange={(e) =>
              updateConsignmentDetailsField("measurement", e.target.value)
            }
          />
        </Field>
        <Field label="Free Days Agreed">
          <Input
            value={consignmentDetails.freeDaysAgreed}
            onChange={(e) =>
              updateConsignmentDetailsField("freeDaysAgreed", e.target.value)
            }
          />
        </Field>
        <Field label="Freight Payable">
          <Input
            value={consignmentDetails.freightPayable}
            onChange={(e) =>
              updateConsignmentDetailsField("freightPayable", e.target.value)
            }
          />
        </Field>

        <Field label="Freight Amount">
          <Input
            type="number"
            min={0}
            step={0.01}
            value={consignmentDetails.freightAmount || ""}
            onChange={(e) =>
              updateConsignmentDetailsField(
                "freightAmount",
                Number(e.target.value || 0),
              )
            }
          />
        </Field>
        <Field label="Place">
          <Input
            value={consignmentDetails.place}
            onChange={(e) =>
              updateConsignmentDetailsField("place", e.target.value)
            }
          />
        </Field>
        <Field label="Date">
          <Input
            type="date"
            value={consignmentDetails.date}
            onChange={(e) =>
              updateConsignmentDetailsField("date", e.target.value)
            }
          />
        </Field>
        <Field label="Date Of Issue">
          <Input
            type="date"
            value={consignmentDetails.dateOfIssue}
            onChange={(e) =>
              updateConsignmentDetailsField("dateOfIssue", e.target.value)
            }
          />
        </Field>
      </div>
    </div>
  );
}

export function BillOfLadingDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: BillOfLadingDialogProps) {
  const createMutation = useCreateBillOfLading();
  const updateMutation = useUpdateBillOfLading();
  const generateBlNumberMutation = useGenerateBlNumber();
  const { data: jobOptions = [] } = useBillOfLadingJobOptions();

  const [jobNo, setJobNo] = useState<number>(() => value?.jobNo ?? 0);
  const [referenceNo, setReferenceNo] = useState<string>(
    () => value?.referenceNo ?? "",
  );
  const [status, setStatus] = useState<BillOfLadingStatus>(
    () => value?.status ?? "Draft",
  );
  const [blNumber, setBlNumber] = useState<string>(() => value?.blNumber ?? "");
  const [consignmentDetails, setConsignmentDetails] =
    useState<BillOfLadingConsignmentDetails>(() => {
      if (!value) return getDefaultBillOfLadingConsignmentDetails();
      return {
        ...getDefaultBillOfLadingConsignmentDetails(),
        ...value.consignmentDetails,
        date: toDateInput(value.consignmentDetails?.date),
        dateOfIssue: toDateInput(value.consignmentDetails?.dateOfIssue),
      };
    });
  const [containerForm, setContainerForm] = useState(() =>
    getDefaultContainerForm(),
  );
  const [containerRows, setContainerRows] = useState<
    BillOfLadingContainerRow[]
  >(() => (value ? hydrateContainerRows(value.containerDetails) : []));
  const [editingContainerId, setEditingContainerId] = useState<string | null>(
    null,
  );

  const selectedJob = useMemo(
    () => jobOptions.find((option) => option.jobNo === jobNo),
    [jobNo, jobOptions],
  );

  const referenceOptions = selectedJob?.references ?? [];
  const containerNoOptions = useMemo(() => {
    if (!selectedJob) return [];

    const filtered = referenceNo
      ? selectedJob.containers.filter(
          (item) => item.referenceNo === referenceNo,
        )
      : selectedJob.containers;

    const unique = new Set<string>();
    for (const item of filtered) {
      const next = String(item.containerNo || "").trim();
      if (next) unique.add(next);
    }

    return Array.from(unique);
  }, [selectedJob, referenceNo]);

  function updateConsignmentDetailsField<
    K extends keyof BillOfLadingConsignmentDetails,
  >(key: K, value: BillOfLadingConsignmentDetails[K]) {
    setConsignmentDetails((prev) => ({ ...prev, [key]: value }));
  }

  function updateContainerField<
    K extends keyof BillOfLadingContainerDetailPayload,
  >(key: K, value: BillOfLadingContainerDetailPayload[K]) {
    setContainerForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onGenerateBlNumber() {
    try {
      const next = await generateBlNumberMutation.mutateAsync();
      setBlNumber(next);
    } catch {
      toast.error("Failed to generate BL number");
    }
  }

  function onAddOrUpdateContainerRecord() {
    const parsed = billOfLadingContainerSchema.safeParse(containerForm);
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check container details",
      );
      return;
    }

    const id = editingContainerId || buildLocalRowId();
    const nextRow = { ...parsed.data, id };

    setContainerRows((prev) =>
      editingContainerId
        ? prev.map((item) => (item.id === editingContainerId ? nextRow : item))
        : [...prev, nextRow],
    );

    setContainerForm(getDefaultContainerForm());
    setEditingContainerId(null);
  }

  function onEditContainerRecord(row: BillOfLadingContainerRow) {
    setEditingContainerId(row.id);
    setContainerForm({
      containerNo: row.containerNo,
      size: row.size,
      type: row.type,
      agentSeal: row.agentSeal,
      customSeal: row.customSeal,
      piece: row.piece,
      countPackage: row.countPackage,
      commodity: row.commodity,
      netWeight: row.netWeight,
      grossWeight: row.grossWeight,
      shippingBill: row.shippingBill,
      cbm: row.cbm,
      hbl: row.hbl,
    });
  }

  function onDeleteContainerRecord(id: string) {
    setContainerRows((prev) => prev.filter((row) => row.id !== id));
    if (editingContainerId === id) {
      setEditingContainerId(null);
      setContainerForm(getDefaultContainerForm());
    }
  }

  function onClearContainerForm() {
    setEditingContainerId(null);
    setContainerForm(getDefaultContainerForm());
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  async function onSubmit() {
    const parsed = billOfLadingFormSchema.safeParse({
      jobNo,
      referenceNo,
      status,
      blNumber,
    });

    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check form values",
      );
      throw new Error("Validation failed");
    }

    if (containerRows.length === 0) {
      toast.error("Add at least one container record");
      throw new Error("Validation failed");
    }

    const payload: BillOfLadingPayload = {
      ...parsed.data,
      consignmentDetails,
      containerDetails: containerRows.map((row) => ({
        containerNo: row.containerNo,
        size: row.size,
        type: row.type,
        agentSeal: row.agentSeal,
        customSeal: row.customSeal,
        piece: row.piece,
        countPackage: row.countPackage,
        commodity: row.commodity,
        netWeight: row.netWeight,
        grossWeight: row.grossWeight,
        shippingBill: row.shippingBill,
        cbm: row.cbm,
        hbl: row.hbl,
      })),
    };

    if (mode === "edit") {
      if (!value?.id) {
        throw new Error("Bill of Lading id is missing");
      }
      await updateMutation.mutateAsync({ id: value.id, payload });
      toast.success("Bill of Lading updated successfully");
      return;
    }

    await createMutation.mutateAsync(payload);
    toast.success("Bill of Lading created successfully");
  }

  return (
    <ResourceDialog<BillOfLading, BillOfLadingPayload, never>
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value ?? null}
      onSuccess={onSuccess}
      createTitle="Create HBL"
      editTitle="Edit HBL"
      dialogContentClassName="max-h-[92vh] w-[calc(100vw-2rem)] sm:w-[1280px] sm:max-w-[1280px] overflow-y-auto"
      customSubmit={onSubmit}
      customIsPending={isSubmitting}
      customDisableSubmit={isSubmitting || containerRows.length === 0}
      submitLabelCreate="Create HBL"
      submitLabelEdit="Save HBL"
      renderBody={() => (
        <div className="space-y-4 py-2">
          <div className="space-y-3 rounded-lg border border-border bg-background p-3">
            <h3 className="text-sm font-semibold">BL Details</h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <Field label="Job No">
                <Select
                  value={jobNo > 0 ? String(jobNo) : ""}
                  onValueChange={(value) => {
                    const parsedNo = Number(value);
                    const selectedOption = jobOptions.find(
                      (option) => option.jobNo === parsedNo,
                    );

                    setJobNo(parsedNo);
                    setReferenceNo("");
                    setContainerForm((prev) => ({ ...prev, containerNo: "" }));
                    if (selectedOption) {
                      setConsignmentDetails((prev) => ({
                        ...prev,
                        shipper: selectedOption.shipper || "",
                        consignee: selectedOption.consignee || "",
                        portOfLoading: selectedOption.portOfLoading || "",
                        portOfDelivery: selectedOption.portOfDelivery || "",
                      }));
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <span>{jobNo > 0 ? jobNo : "Select job"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {jobOptions.map((item) => (
                      <SelectItem key={item.jobNo} value={String(item.jobNo)}>
                        {item.jobNo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Reference No">
                <Select
                  value={referenceNo}
                  onValueChange={(value) => {
                    setReferenceNo(value ?? "");
                    setContainerForm((prev) => ({ ...prev, containerNo: "" }));
                  }}
                  disabled={jobNo <= 0 || referenceOptions.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <span>{referenceNo || "Select reference"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {referenceOptions.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Status">
                <Select
                  value={status}
                  onValueChange={(value) =>
                    setStatus(value as BillOfLadingStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <span>{status}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {BILL_OF_LADING_STATUS_OPTIONS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="BL Number">
                <div className="flex items-center gap-2">
                  <Input
                    value={blNumber}
                    readOnly
                    placeholder="JEA/SCTF/1/2026"
                  />
                  <Button
                    type="button"
                    onClick={onGenerateBlNumber}
                    disabled={generateBlNumberMutation.isPending}
                  >
                    {generateBlNumberMutation.isPending
                      ? "Generating..."
                      : "Generate BL"}
                  </Button>
                </div>
              </Field>
            </div>
          </div>

          <ConsignmentDetailsSection
            consignmentDetails={consignmentDetails}
            updateConsignmentDetailsField={updateConsignmentDetailsField}
          />

          <div className="space-y-3 rounded-lg border border-border bg-background p-3">
            <h3 className="text-sm font-semibold">Container Details</h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <Field label="Container No">
                <Select
                  value={containerForm.containerNo}
                  onValueChange={(value) =>
                    updateContainerField("containerNo", value ?? "")
                  }
                  disabled={containerNoOptions.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <span>
                      {containerForm.containerNo || "Select container"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {containerNoOptions.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Size">
                <Select
                  value={containerForm.size}
                  onValueChange={(value) =>
                    updateContainerField(
                      "size",
                      value as BillOfLadingContainerDetailPayload["size"],
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <span>{containerForm.size}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {BILL_OF_LADING_SIZE_OPTIONS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Type">
                <Select
                  value={containerForm.type}
                  onValueChange={(value) =>
                    updateContainerField(
                      "type",
                      value as BillOfLadingContainerDetailPayload["type"],
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <span>{containerForm.type}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {BILL_OF_LADING_TYPE_OPTIONS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Commodity">
                <Select
                  value={containerForm.commodity}
                  onValueChange={(value) =>
                    updateContainerField(
                      "commodity",
                      value as BillOfLadingContainerDetailPayload["commodity"],
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <span>{containerForm.commodity}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {BILL_OF_LADING_COMMODITY_OPTIONS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Agent Seal">
                <Input
                  value={containerForm.agentSeal}
                  onChange={(e) =>
                    updateContainerField("agentSeal", e.target.value)
                  }
                />
              </Field>

              <Field label="Custom Seal">
                <Input
                  value={containerForm.customSeal}
                  onChange={(e) =>
                    updateContainerField("customSeal", e.target.value)
                  }
                />
              </Field>

              <Field label="Piece">
                <Input
                  type="number"
                  min={0}
                  value={containerForm.piece || ""}
                  onChange={(e) =>
                    updateContainerField("piece", Number(e.target.value || 0))
                  }
                />
              </Field>

              <Field label="Count / Package">
                <Input
                  value={containerForm.countPackage}
                  onChange={(e) =>
                    updateContainerField("countPackage", e.target.value)
                  }
                />
              </Field>

              <Field label="Net Weight">
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={containerForm.netWeight || ""}
                  onChange={(e) =>
                    updateContainerField(
                      "netWeight",
                      Number(e.target.value || 0),
                    )
                  }
                />
              </Field>

              <Field label="Gross Weight">
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={containerForm.grossWeight || ""}
                  onChange={(e) =>
                    updateContainerField(
                      "grossWeight",
                      Number(e.target.value || 0),
                    )
                  }
                />
              </Field>

              <Field label="Shipping Bill">
                <Input
                  value={containerForm.shippingBill}
                  onChange={(e) =>
                    updateContainerField("shippingBill", e.target.value)
                  }
                />
              </Field>

              <Field label="CBM">
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={containerForm.cbm || ""}
                  onChange={(e) =>
                    updateContainerField("cbm", Number(e.target.value || 0))
                  }
                />
              </Field>

              <Field label="HBL">
                <Input
                  value={containerForm.hbl}
                  onChange={(e) => updateContainerField("hbl", e.target.value)}
                />
              </Field>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClearContainerForm}
              >
                Clear
              </Button>
              <Button type="button" onClick={onAddOrUpdateContainerRecord}>
                {editingContainerId ? "Update Record" : "Add Record"}
              </Button>
            </div>

            <div className="overflow-x-auto rounded-md border border-border/70 bg-muted/10">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Edit</TableHead>
                    <TableHead>Delete</TableHead>
                    <TableHead>Container No</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Agent Seal</TableHead>
                    <TableHead>Custom Seal</TableHead>
                    <TableHead>Piece</TableHead>
                    <TableHead>Count/Package</TableHead>
                    <TableHead>Commodity</TableHead>
                    <TableHead>Net Wt</TableHead>
                    <TableHead>Gross Wt</TableHead>
                    <TableHead>Shipping Bill</TableHead>
                    <TableHead>CBM</TableHead>
                    <TableHead>HBL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {containerRows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={15}
                        className="text-center text-muted-foreground"
                      >
                        No container details added yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    containerRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => onEditContainerRecord(row)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => onDeleteContainerRecord(row.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell>{row.containerNo}</TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.agentSeal || "-"}</TableCell>
                        <TableCell>{row.customSeal || "-"}</TableCell>
                        <TableCell>{row.piece}</TableCell>
                        <TableCell>{row.countPackage || "-"}</TableCell>
                        <TableCell>{row.commodity}</TableCell>
                        <TableCell>{row.netWeight}</TableCell>
                        <TableCell>{row.grossWeight}</TableCell>
                        <TableCell>{row.shippingBill || "-"}</TableCell>
                        <TableCell>{row.cbm}</TableCell>
                        <TableCell>{row.hbl || "-"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    />
  );
}
