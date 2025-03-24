"use server";

import { auth } from "@/auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  GuestUpdatedType,
  updateBooking,
  updateGuest,
} from "../data-service";
import { revalidatePath } from "next/cache";
import { BookingType } from "@/app/_components/ReservationCard";
import { redirect } from "next/navigation";

export const updateProfile = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData
    .get("nationality")
    ?.toString()
    .split("%") as string[];
  if (!/^[a-zA-Z0-9]{6,12}$/.test(String(nationalID)))
    throw new Error("Please provide a valid national ID");
  // @ts-expect-error err
  const guestId = session.user?.guestId as number;
  const updatedItems: GuestUpdatedType = {
    countryFlag,
    nationalID: Number(nationalID),
    nationality,
  };
  await updateGuest(guestId, updatedItems);
  revalidatePath("/account/profile");
};

export interface NewReservationType {
  startDate: Date;
  endDate: Date;
  numGuests: number;
  numNights: number;
  observations: string;
  totalPrice: number;
  extrasPrice: number;
  cabinID: string;
  status: string;
  isPaid: boolean;
  hasBreakfast: boolean;
  guestID:string
}
export interface BookingDataType {
  startDate: Date;
  endDate: Date;
  numNights: number;
  cabinPrice: number;
  cabinId: string;
}

export const createReservation = async (
  bookingData: BookingDataType,
  formData: FormData
) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const { cabinId, cabinPrice, endDate, numNights, startDate } = bookingData;
    // @ts-expect-error err
  const guestID=String(session?.user?.guestId)
  const newBooking: NewReservationType = {
    endDate,
    numNights,
    startDate,
    numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations")).slice(0, 1000),
    extrasPrice: 0,
    totalPrice: cabinPrice,
    cabinID:cabinId,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    guestID
  };
  await createBooking(newBooking)
  revalidatePath(`/cabins/${cabinId}`)
  redirect('/thankyou')
};

export const deleteReservation = async (id: number) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  // @ts-expect-error err
  const guestBookings = (await getBookings(Number(session?.user?.guestId)
  )) as unknown;
  const bookings = guestBookings as BookingType[];
  const bookingIds = bookings.map((booking) => Number(booking.id));
  if (!bookingIds.includes(Number(id))) {
    throw new Error("You are not allowed to delete this booking");
  }
  await deleteBooking(id);
  revalidatePath("/account/reservations");
};

export interface UpdatedBookingType {
  numGuests: number;
  observations: string;
}

export const updateReservation = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  await updateBooking(Number(formData.get("id")), {
    numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations")),
  });
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
};
