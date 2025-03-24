import { auth, UserAuthType } from "@/auth";
import {
  getBookedDatesByCabinId,
  getSettings,
  SettingsType,
} from "../_lib/data-service";
import { CabinType } from "./CabinCard";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";

interface ReservationPropsType {
  cabin: CabinType;
}

const Reservation = async ({ cabin }: ReservationPropsType) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(Number(cabin.id)),
  ]);
  const settingsItems = settings as SettingsType;
  const session=await auth()

  return (
    <div className="grid grid-cols-[55%,45%] items-stretch border border-solid border-primary-800 min-h-[400px]">
      <DateSelector bookedDates={bookedDates} settings={settingsItems} cabin={cabin} />
      {session ? <ReservationForm user={session.user as UserAuthType} cabin={cabin} /> : <LoginMessage/>}
    </div>
  );
};

export default Reservation;
