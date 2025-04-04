"use client";

import { UserAuthType } from "@/auth";
import { useReservationContext } from "../_context/ReservationContext";
import { CabinType } from "./CabinCard";
import { differenceInDays } from "date-fns";
import { createReservation } from "../_lib/actions/actions";
import { useFormStatus } from "react-dom";

interface ReservationFormPropsType {
  cabin: CabinType;
  user: UserAuthType;
}

function ReservationForm({ cabin, user }: ReservationFormPropsType) {
  const { range, resetRange } = useReservationContext();
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range.from as Date;
  const endDate = range.to as Date;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);
  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div className="">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>
      <form
        action={async (formData: FormData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {startDate && endDate ? (
            <Button />
          ) : (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Reserving..." : "Reserve now"}
    </button>
  );
};

export default ReservationForm;
