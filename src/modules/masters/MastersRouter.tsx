import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { PlaceholderPage } from "@/shared/components/PlaceholderPage";

const EmployeeListPage = lazy(() =>
  import("@/modules/masters/employee/pages/EmployeeListPage").then((m) => ({
    default: m.EmployeeListPage,
  })),
);
const CustomerTypePage = lazy(() =>
  import("@/modules/masters/customer/pages/CustomerTypePage").then((m) => ({
    default: m.CustomerTypePage,
  })),
);
const CustomerListPage = lazy(() =>
  import("@/modules/masters/customer/pages/CustomerListPage").then((m) => ({
    default: m.CustomerListPage,
  })),
);
const VesselListPage = lazy(() =>
  import("@/modules/masters/vessel/pages/VesselListPage").then((m) => ({
    default: m.VesselListPage,
  })),
);
const PortListPage = lazy(() =>
  import("@/modules/masters/port/pages/PortListPage").then((m) => ({
    default: m.PortListPage,
  })),
);
const TermsListPage = lazy(() =>
  import("@/modules/masters/terms/pages/TermsListPage").then((m) => ({
    default: m.TermsListPage,
  })),
);
const ServiceListPage = lazy(() =>
  import("@/modules/masters/service/pages/ServiceListPage").then((m) => ({
    default: m.ServiceListPage,
  })),
);
const ShipmentListPage = lazy(() =>
  import("@/modules/masters/shipment/pages/ShipmentListPage").then((m) => ({
    default: m.ShipmentListPage,
  })),
);
const LineOfBixListPage = lazy(() =>
  import("@/modules/masters/line-of-bix/pages/LineOfBixListPage").then((m) => ({
    default: m.LineOfBixListPage,
  })),
);
const TermsConditionListPage = lazy(() =>
  import("@/modules/masters/terms-condition/pages/TermsConditionListPage").then(
    (m) => ({ default: m.TermsConditionListPage }),
  ),
);
const TariffDescriptionListPage = lazy(() =>
  import("@/modules/masters/tariff-description/pages/TariffDescriptionListPage").then(
    (m) => ({ default: m.TariffDescriptionListPage }),
  ),
);
const VendorAgentListPage = lazy(() =>
  import("@/modules/masters/vendor-agent/pages/VendorAgentListPage").then(
    (m) => ({ default: m.VendorAgentListPage }),
  ),
);
const VendorTypePage = lazy(() =>
  import("@/modules/masters/vendor-agent/pages/VendorTypePage").then((m) => ({
    default: m.VendorTypePage,
  })),
);

export const MASTERS_DEFAULT_PATH = "/masters/employee";

export function MastersRouter() {
  return (
    <Routes>
      <Route index element={<Navigate to="employee" replace />} />

      <Route path="employee" element={<EmployeeListPage />} />

      <Route path="customer" element={<PlaceholderPage title="Customer" />} />
      <Route path="type" element={<CustomerTypePage />} />
      <Route path="details" element={<CustomerListPage />} />
      <Route path="vendor">
        <Route index element={<Navigate to="details" replace />} />
        <Route path="type" element={<VendorTypePage />} />
        <Route path="details" element={<VendorAgentListPage />} />
      </Route>
      <Route
        path="vendor-agent"
        element={<Navigate to="vendor/details" replace />}
      />
      <Route path="vessel" element={<VesselListPage />} />
      <Route path="port" element={<PortListPage />} />
      <Route path="terms" element={<TermsListPage />} />
      <Route path="service" element={<ServiceListPage />} />
      <Route path="shipment" element={<ShipmentListPage />} />
      <Route path="line-of-bix" element={<LineOfBixListPage />} />
      <Route path="terms-condition" element={<TermsConditionListPage />} />
      <Route path="tariff">
        <Route index element={<Navigate to="description" replace />} />
        <Route path="description" element={<TariffDescriptionListPage />} />
        <Route
          path="master"
          element={<PlaceholderPage title="Tariff Master" />}
        />
      </Route>
      <Route
        path="exchange-rate"
        element={<PlaceholderPage title="Exchange Rate" />}
      />
    </Routes>
  );
}
