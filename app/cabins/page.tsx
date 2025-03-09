import { Metadata } from "next";
import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

export const revalidate = 3600;


export const metadata: Metadata = {
  title: "Cabins",
};

interface searchParamsType{
 capacity:string
}

interface PagePropsType {
  searchParams:searchParamsType;
}

const page = (props: PagePropsType) => {
  const {searchParams}=props
  const filter=searchParams.capacity || "all"
 
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy beauty of nature in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

        <div className="mb-8 flex justify-end">
          <Filter/>
        </div>
      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
};

export default page;
