import { Route, Routes } from "react-router-dom";
import { BillOfLadingListPage } from "@/modules/bill-of-lading/pages/BillOfLadingListPage";

export function BillOfLadingRouter() {
  return (
    <Routes>
      <Route index element={<BillOfLadingListPage />} />
    </Routes>
  );
}
