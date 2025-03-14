"use client";

import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { SettingsType } from "../_lib/data-service";
import { CabinType } from "./CabinCard";
import { useState } from "react";
import { useReservationContext } from "../_context/ReservationContext";

// function isAlreadyBooked(range, datesArr) {
//   return (
//     range.from &&
//     range.to &&
//     datesArr.some((date) =>
//       isWithinInterval(date, { start: range.from, end: range.to })
//     )
//   );
// }

interface DateSelectorPropsType {
  settings: SettingsType;
  cabin: CabinType;
}

export interface RangeType {
  from: undefined | Date;
  to: undefined | Date;
}

function DateSelector({ settings, cabin }: DateSelectorPropsType) {
  const { handleChangeRange, range, resetRange } = useReservationContext();

  const { maxBookingLength, minBookingLength } = settings;
  const { regularPrice, discount } = cabin;
  // CHANGE
  const numNights = 23;
  const cabinPrice = 23;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-6 px-1">
        <DayPicker
          className="pt-12"
          mode="range"
          selected={range}
          onSelect={(range) =>
            handleChangeRange({ from: range?.from, to: range?.to })
          }
          min={minBookingLength + 1}
          max={maxBookingLength}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
        />
      </div>

      <div className="w-full mt-6 bg-accent-500 text-primary-800 py-4 px-8 flex items-center justify-between h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            onClick={resetRange}
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
