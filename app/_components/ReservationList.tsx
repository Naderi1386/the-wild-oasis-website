"use client";

import { useOptimistic } from "react";
import ReservationCard, { BookingType } from "./ReservationCard";
import { deleteReservation } from "../_lib/actions/actions";
interface ReservationListPropsType {
  bookingItems: BookingType[];
}

const ReservationList = ({ bookingItems }: ReservationListPropsType) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookingItems,
    (currentBookings: BookingType[], bookingId: number) => {
      return currentBookings.filter((booking) => Number(booking.id) !== bookingId);
    }
  );
  const handleDelete =async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
