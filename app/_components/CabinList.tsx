import CabinCard, { CabinType } from "./CabinCard";
import { getCabins } from "../_lib/data-service";

interface CabinListPropsType {
  filter: string;
}

const CabinList = async ({ filter }: CabinListPropsType) => {
  const cabins = (await getCabins()) as CabinType[];
  const isCabins = cabins.length > 0;
  if (!isCabins) return null;
  const filterCabins =
    filter === "small"
      ? cabins.filter((cabin) => cabin.maxCapacity < 4)
      : filter === "medium"
      ? cabins.filter(
          (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
        )
      : filter === "large"
      ? cabins.filter((cabin) => cabin.maxCapacity >= 8)
      : cabins;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filterCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
