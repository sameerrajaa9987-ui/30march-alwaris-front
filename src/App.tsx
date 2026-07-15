import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppLayout } from "./app/layouts/AppLayout";
import { RequireAuth } from "./app/router/RequireAuth";
import { PlaceholderPage } from "./shared/components/PlaceholderPage";
import { PageLoader } from "./shared/components/PageLoader";

const LandingPage = lazy(() =>
  import("./modules/landing/pages/LandingPage").then((m) => ({
    default: m.LandingPage,
  })),
);
const ServicePage = lazy(() =>
  import("./modules/landing/pages/ServicePage").then((m) => ({
    default: m.ServicePage,
  })),
);
const LoginPage = lazy(() =>
  import("./modules/auth/pages/LoginPage").then((m) => ({
    default: m.LoginPage,
  })),
);
const MastersRouter = lazy(() =>
  import("./modules/masters/MastersRouter").then((m) => ({
    default: m.MastersRouter,
  })),
);
const BookingRouter = lazy(() =>
  import("./modules/booking/BookingRouter").then((m) => ({
    default: m.BookingRouter,
  })),
);
const BillOfLadingRouter = lazy(() =>
  import("./modules/bill-of-lading/BillOfLadingRouter").then((m) => ({
    default: m.BillOfLadingRouter,
  })),
);
const VendorDocumentsPage = lazy(() =>
  import("./modules/document-upload/vendor-documents/pages/VendorDocumentsPage").then(
    (m) => ({ default: m.VendorDocumentsPage }),
  ),
);
const CostSheetCreatePage = lazy(() =>
  import("./modules/cost-sheet/pages/CostSheetCreatePage").then((m) => ({
    default: m.CostSheetCreatePage,
  })),
);
const CostSheetApprovalListPage = lazy(() =>
  import("./modules/cost-sheet/pages/CostSheetApprovalListPage").then((m) => ({
    default: m.CostSheetApprovalListPage,
  })),
);
const InvoiceRouter = lazy(() =>
  import("./modules/invoice/InvoiceRouter").then((m) => ({
    default: m.InvoiceRouter,
  })),
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public marketing website */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated portal (pathless layout route) */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="masters/*" element={<MastersRouter />} />
          <Route path="booking/*" element={<BookingRouter />} />

          <Route path="bill-of-lading/*" element={<BillOfLadingRouter />} />
          <Route
            path="document-upload/vendor-documents"
            element={<VendorDocumentsPage />}
          />
          <Route
            path="document-upload/master-bl-upload"
            element={<VendorDocumentsPage />}
          />

          <Route path="cost-sheet/create" element={<CostSheetCreatePage />} />
          <Route
            path="cost-sheet/approval"
            element={<CostSheetApprovalListPage />}
          />

          <Route path="create-invoice/*" element={<InvoiceRouter />} />

          <Route
            path="advance/payment"
            element={<PlaceholderPage title="Advance Payment" />}
          />
          <Route
            path="advance/receipt"
            element={<PlaceholderPage title="Advance Receipt" />}
          />

          <Route
            path="settings/user-management"
            element={<PlaceholderPage title="User Management" />}
          />
          <Route
            path="settings/system-config"
            element={<PlaceholderPage title="System Config" />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
