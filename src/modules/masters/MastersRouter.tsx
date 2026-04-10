import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeListPage } from "@/modules/masters/employee/pages/EmployeeListPage";
import { CustomerTypePage } from "@/modules/masters/customer/pages/CustomerTypePage";
import { CustomerListPage } from "@/modules/masters/customer/pages/CustomerListPage";
import { VesselListPage } from "@/modules/masters/vessel/pages/VesselListPage";
import { PortListPage } from "@/modules/masters/port/pages/PortListPage";
import { TermsListPage } from "@/modules/masters/terms/pages/TermsListPage";
import { ServiceListPage } from "@/modules/masters/service/pages/ServiceListPage";
import { ShipmentListPage } from "@/modules/masters/shipment/pages/ShipmentListPage";
import { LineOfBixListPage } from "@/modules/masters/line-of-bix/pages/LineOfBixListPage";
import { TermsConditionListPage } from "@/modules/masters/terms-condition/pages/TermsConditionListPage";
import { TariffDescriptionListPage } from "@/modules/masters/tariff-description/pages/TariffDescriptionListPage";
import { VendorAgentListPage } from "@/modules/masters/vendor-agent/pages/VendorAgentListPage";
import { VendorTypePage } from "@/modules/masters/vendor-agent/pages/VendorTypePage";
import { PlaceholderPage } from "@/shared/components/PlaceholderPage";

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
