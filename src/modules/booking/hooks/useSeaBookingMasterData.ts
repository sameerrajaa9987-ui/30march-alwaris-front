import { SEA_BOOKING_MASTER_QUERIES } from "@/modules/booking/constants/seaBooking.queries";
import { useCustomers } from "@/modules/masters/customer/hooks";
import { useEmployees } from "@/modules/masters/employee/hooks";
import { useLineOfBix } from "@/modules/masters/line-of-bix/hooks";
import { usePorts } from "@/modules/masters/port/hooks";
import { useTariffDescriptions } from "@/modules/masters/tariff-description/hooks";
import { useTerms } from "@/modules/masters/terms/hooks";
import { useVendorAgents } from "@/modules/masters/vendor-agent/hooks";
import { useVessels } from "@/modules/masters/vessel/hooks";

export function useSeaBookingMasterData() {
  const employees =
    useEmployees(SEA_BOOKING_MASTER_QUERIES.employees).data?.items ?? [];
  const customers =
    useCustomers(SEA_BOOKING_MASTER_QUERIES.customers).data?.items ?? [];
  const ports = usePorts(SEA_BOOKING_MASTER_QUERIES.ports).data?.items ?? [];
  const terms = useTerms(SEA_BOOKING_MASTER_QUERIES.terms).data?.items ?? [];
  const lineOfBix =
    useLineOfBix(SEA_BOOKING_MASTER_QUERIES.lineOfBix).data?.items ?? [];
  const vessels =
    useVessels(SEA_BOOKING_MASTER_QUERIES.vessels).data?.items ?? [];
  const tariffDescriptions =
    useTariffDescriptions(SEA_BOOKING_MASTER_QUERIES.tariffDescriptions).data
      ?.items ?? [];
  const vendorAgents =
    useVendorAgents(SEA_BOOKING_MASTER_QUERIES.vendorAgents).data?.items ?? [];

  return {
    employees,
    customers,
    ports,
    terms,
    lineOfBix,
    vessels,
    tariffDescriptions,
    vendorAgents,
  };
}
