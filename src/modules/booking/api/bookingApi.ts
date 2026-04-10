import { createResourceApi } from "@/modules/common/shared-crud/createResourceApi";
import { http } from "@/shared/api/http";
import type {
  SeaBooking,
  SeaBookingPayload,
  SeaBookingListQuery,
  SeaBookingListResult,
} from "@/modules/booking/types";

const bookingApi = createResourceApi<
  SeaBooking,
  SeaBookingListQuery,
  SeaBookingPayload
>("/bookings");

export const listBookings = async (query: SeaBookingListQuery) =>
  bookingApi.list(query) satisfies Promise<SeaBookingListResult>;
export const createBooking = (payload: SeaBookingPayload) =>
  bookingApi.create(payload);
export const updateBooking = (
  id: string,
  payload: Partial<SeaBookingPayload>,
) => bookingApi.update(id, payload);
export const deleteBooking = (id: string) => bookingApi.remove(id);

export async function getNextBookingReference() {
  const res = await http.get<{ data: { generatedReference: string } }>(
    "/bookings/next-reference",
  );
  return res.data.data.generatedReference;
}
