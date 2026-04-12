import { Navigate, Route, Routes } from "react-router-dom";
import { PlaceholderPage } from "@/shared/components/PlaceholderPage";
import { lazy } from "react";
const SeaBookingListPage = lazy(() =>
  import("@/modules/booking/pages/SeaBookingListPage").then((m) => ({
    default: m.SeaBookingListPage,
  })),
);

export function BookingRouter() {
  return (
    <Routes>
      <Route index element={<Navigate to="sea" replace />} />
      <Route path="sea" element={<SeaBookingListPage />} />
      <Route path="air" element={<PlaceholderPage title="Air Booking" />} />
    </Routes>
  );
}
