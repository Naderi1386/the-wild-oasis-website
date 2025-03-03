import CabinCard, { CabinType } from "./CabinCard";
import { getCabins } from "../_lib/data-service";

const CabinList = async () => {
  const cabins = (await getCabins()) as CabinType[];
  const isCabins = cabins.length > 0;
  if (!isCabins) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
