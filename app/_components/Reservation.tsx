import { getBookedDatesByCabinId, getSettings, SettingsType } from "../_lib/data-service";
import { CabinType } from "./CabinCard";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

interface ReservationPropsType{
    cabin:CabinType
}

const Reservation = async ({cabin}: ReservationPropsType) => {
//   const settings = (await getSettings()) as SettingsType;
//   const bookedDates = await getBookedDatesByCabinId(Number(cabinID));    
       const [settings,bookedDates] = await Promise.all([
         getSettings(),
         getBookedDatesByCabinId(Number(cabin.id)),
       ]);
       const settingsItems=settings as SettingsType
  return (
    <div className="grid grid-cols-2 border border-solid border-primary-800 min-h-[400px]">
      <DateSelector settings={settingsItems} cabin={cabin} />
      <ReservationForm cabin={cabin}/>
    </div>
  );
};

export default Reservation