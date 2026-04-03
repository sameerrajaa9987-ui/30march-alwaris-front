import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "./app/layouts/AppLayout";
import { useAppDispatch } from "./app/hooks";
import { RequireAuth } from "./app/router/RequireAuth";
import { clearAuth } from "./modules/auth/authSlice";
import { LoginPage } from "./modules/auth/pages/LoginPage";
import {
  MASTERS_DEFAULT_PATH,
  MastersRouter,
} from "./modules/masters/MastersRouter";
import { PlaceholderPage } from "./shared/components/PlaceholderPage";

function LogoutRoute() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
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
        <Route index element={<Navigate to={MASTERS_DEFAULT_PATH} replace />} />
        <Route path="masters/*" element={<MastersRouter />} />

        <Route path="booking">
          <Route path="sea" element={<PlaceholderPage title="Sea Booking" />} />
          <Route path="air" element={<PlaceholderPage title="Air Booking" />} />
        </Route>

        <Route
          path="bill-of-lading"
          element={<PlaceholderPage title="Bill of Lading" />}
        />
        <Route
          path="document-upload/vendor-documents"
          element={<PlaceholderPage title="Vendor Documents" />}
        />
        <Route
          path="document-upload/master-bl-upload"
          element={<PlaceholderPage title="Master BL Upload" />}
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
  );
}
