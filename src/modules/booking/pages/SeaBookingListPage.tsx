import { useState } from "react";
import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { SeaBookingDialog } from "@/modules/booking/components/SeaBookingDialog";
import {
  SeaBookingFilters,
  type SeaBookingFiltersValue,
} from "@/modules/booking/components/SeaBookingFilters";
import { buildSeaBookingTableQuery } from "@/modules/booking/constants/seaBooking.queries";
import {
  useBookings,
  useDeleteBooking,
} from "@/modules/booking/hooks/useBookings";
import { useSeaBookingMasterData } from "@/modules/booking/hooks/useSeaBookingMasterData";
import type { SeaBooking, SeaBookingTableQuery } from "@/modules/booking/types";

export function SeaBookingListPage() {
  const [filters, setFilters] = useState<SeaBookingFiltersValue>({
    search: "",
  });
  const {
    employees,
    customers,
    ports,
    terms,
    lineOfBix,
    vessels,
    tariffDescriptions,
    vendorAgents,
  } = useSeaBookingMasterData();

  return (
    <ResourceListPage<SeaBooking, SeaBookingTableQuery>
      title="Sea Booking"
      subtitle="Manage sea bookings."
      newButtonText="Add Booking"
      minTableWidth="min-w-[1300px]"
      emptyText="No bookings found."
      deleteConfirmText="Delete this booking?"
      defaultSortBy="createdAt"
      hideIdColumn
      buildQuery={({ search, page, limit }) =>
        buildSeaBookingTableQuery({
          search,
          filtersSearch: filters.search,
          page,
          limit,
        })
      }
      renderFilters={() => (
        <SeaBookingFilters
          value={filters}
          onChange={(next) => {
            setFilters(next);
          }}
        />
      )}
      columns={[
        {
          header: "Job No",
          getValue: (item) => item.jobNo,
          valueClassName: "font-mono",
        },
        {
          header: "Ref",
          getValue: (item) =>
            item.shipmentDetails?.[0]?.generatedReference || "-",
        },
        {
          header: "Booking Party",
          getValue: (item) => item.bookingPartyName || item.bookingParty || "-",
        },
        { header: "Shipper", getValue: (item) => item.shipper || "-" },
        { header: "Consignee", getValue: (item) => item.consignee || "-" },
        { header: "Mode", getValue: (item) => item.modeOfTransport },
        { header: "Status", getValue: (item) => item.status },
        {
          header: "ETD",
          getValue: (item) =>
            item.shipmentDetails?.[0]?.etd?.split("T")[0] ??
            item.shipmentDetails?.[0]?.etd ??
            "-",
        },
        {
          header: "ETA",
          getValue: (item) =>
            item.shipmentDetails?.[0]?.eta?.split("T")[0] ??
            item.shipmentDetails?.[0]?.eta ??
            "-",
        },
      ]}
      getIdValue={(item) => item.id}
      useList={useBookings}
      useDelete={useDeleteBooking}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <SeaBookingDialog
          key={`${mode}-${value?.id ?? "new"}-${open ? "open" : "closed"}`}
          open={open}
          onOpenChange={onOpenChange}
          mode={mode}
          value={value}
          onSuccess={onSuccess}
          employees={employees}
          customers={customers}
          ports={ports}
          terms={terms}
          lineOfBix={lineOfBix}
          vessels={vessels}
          tariffDescriptions={tariffDescriptions}
          vendorAgents={vendorAgents}
        />
      )}
    />
  );
}
