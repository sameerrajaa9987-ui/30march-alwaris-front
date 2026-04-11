import { useMutation } from "@tanstack/react-query";
import { createResourceHooks } from "@/modules/common/shared-crud/createResourceHooks";
import {
  listBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getNextBookingReference,
} from "@/modules/booking/api/bookingApi";
import type {
  SeaBookingPayload,
  SeaBookingListQuery,
  SeaBookingListResult,
} from "@/modules/booking/types";

const bookingCrud = createResourceHooks<
  SeaBookingListQuery,
  SeaBookingPayload,
  SeaBookingListResult
>("bookings", {
  list: listBookings,
  create: createBooking,
  update: updateBooking,
  remove: deleteBooking,
});

export const useBookings = bookingCrud.useList;
export const useCreateBooking = bookingCrud.useCreate;
export const useUpdateBooking = bookingCrud.useUpdate;
export const useDeleteBooking = bookingCrud.useDelete;

export function useGenerateBookingReference() {
  return useMutation({ mutationFn: getNextBookingReference });
}
