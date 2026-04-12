import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
const BillOfLadingListPage = lazy(() =>
  import("@/modules/bill-of-lading/pages/BillOfLadingListPage").then((m) => ({
    default: m.BillOfLadingListPage,
  })),
);

export function BillOfLadingRouter() {
  return (
    <Routes>
      <Route index element={<BillOfLadingListPage />} />
    </Routes>
  );
}
