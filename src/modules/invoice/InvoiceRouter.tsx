import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const InvoiceListPage = lazy(() =>
  import("@/modules/invoice/pages/InvoiceListPage").then((m) => ({
    default: m.InvoiceListPage,
  })),
);

export function InvoiceRouter() {
  return (
    <Routes>
      <Route index element={<InvoiceListPage defaultType="Proforma" />} />
      <Route
        path="income"
        element={<InvoiceListPage defaultType="Proforma" />}
      />
      <Route
        path="tax-proforma"
        element={<InvoiceListPage defaultType="Tax Invoice" />}
      />
    </Routes>
  );
}
