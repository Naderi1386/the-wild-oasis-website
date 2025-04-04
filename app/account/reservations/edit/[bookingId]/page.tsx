import { CabinType } from "@/app/_components/CabinCard";
import { BookingType } from "@/app/_components/ReservationCard";
import SpinnerMini from "@/app/_components/SpinnerMini";
import UpdateButton from "@/app/_components/UpdateButton";
import { updateReservation } from "@/app/_lib/actions/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
interface ParamsType {
  bookingId: number;
}
interface PagePropsType {
  params: ParamsType;
}

const page = async (props: PagePropsType) => {
  const booking = (await getBooking(props.params.bookingId)) as BookingType;
  const { id, cabinID,observations,numGuests } = booking;
  const cabin = (await getCabin(String(cabinID))) as CabinType;
  const { maxCapacity } = cabin;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{id}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" name="id" value={id} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={numGuests}
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
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <UpdateButton>
            <SpinnerMini />
          </UpdateButton>
        </div>
      </form>
    </div>
  );
};

export default page;
