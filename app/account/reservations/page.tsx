import { BookingType } from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { getBookings } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
};
const page = async () => {
  const session = await auth();
  // @ts-expect-error error
  const guestID = Number(session?.user?.guestId);
  const bookings = (await getBookings(guestID)) as unknown;
  const bookingItems = bookings as BookingType[];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookingItems.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookingItems={bookingItems} />
      )}
    </div>
  );
};

export default page;
