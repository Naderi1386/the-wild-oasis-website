import { CabinType } from "@/app/_components/CabinCard";
import CabinDetails from "@/app/_components/CabinDetails";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

interface ParamsType {
  cabinId: string;
}

interface PagePropsType {
  params: ParamsType;
}
export async function generateMetadata({ params }: PagePropsType) {
  const { name } = (await getCabin(params.cabinId)) as CabinType;
  return { title: `Cabin ${name}` };
}
export async function generateStaticParams() {
  const cabins = (await getCabins()) as CabinType[];
  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
}

const page = async ({ params }: PagePropsType) => {
  const cabinID = params.cabinId;
  const cabinItems = (await getCabin(cabinID)) as CabinType;

  return (
    <div>
      <div className="max-w-6xl mx-auto mt-8">
        <CabinDetails cabin={cabinItems} />
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabinItems.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabinItems} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
