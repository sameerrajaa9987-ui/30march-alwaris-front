import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { AppLayout } from "./app/layouts/AppLayout";
import { useAppDispatch } from "./app/hooks";
import { RequireAuth } from "./app/router/RequireAuth";
import { clearAuth } from "./modules/auth/authSlice";
import { PlaceholderPage } from "./shared/components/PlaceholderPage";
import { PageLoader } from "./shared/components/PageLoader";

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

function LogoutRoute() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/masters/employee" replace />} />
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

          <Route
            path="cost-sheet/create"
            element={<PlaceholderPage title="Create Cost Sheet" />}
          />
          <Route
            path="cost-sheet/approval"
            element={<PlaceholderPage title="Cost Sheet Approval" />}
          />

          <Route
            path="create-invoice/income"
            element={<PlaceholderPage title="Income Invoice" />}
          />
          <Route
            path="create-invoice/tax-proforma"
            element={<PlaceholderPage title="Tax / Proforma Invoice" />}
          />

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
          <Route path="logout" element={<LogoutRoute />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
