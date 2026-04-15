import { Input } from "@/components/ui/input";
import { Field } from "@/modules/bill-of-lading/components/Field";
import type { BillOfLadingConsignmentDetails } from "@/modules/bill-of-lading/types";

interface ConsignmentDetailsSectionProps {
  consignmentDetails: BillOfLadingConsignmentDetails;
  updateConsignmentDetailsField: <
    K extends keyof BillOfLadingConsignmentDetails,
  >(
    key: K,
    value: BillOfLadingConsignmentDetails[K],
  ) => void;
}

export function ConsignmentDetailsSection({
  consignmentDetails,
  updateConsignmentDetailsField,
}: ConsignmentDetailsSectionProps) {
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
