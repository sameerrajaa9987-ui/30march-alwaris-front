import { Navigate, Route, Routes } from "react-router-dom";
import { PlaceholderPage } from "@/shared/components/PlaceholderPage";
import { SeaBookingListPage } from "@/modules/booking/pages/SeaBookingListPage";

export function BookingRouter() {
  return (
    <Routes>
      <Route index element={<Navigate to="sea" replace />} />
      <Route path="sea" element={<SeaBookingListPage />} />
      <Route path="air" element={<PlaceholderPage title="Air Booking" />} />
    </Routes>
  );
}
