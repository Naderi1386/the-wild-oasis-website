"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const onFilterClick = (value: string) => {
    const params=new URLSearchParams(searchParams)
    params.set("capacity",value)
    replace(`${pathname}?${params.toString()}`)
  };
  return (
    <div className="border border-primary-800 flex items-center gap-3">
      <button
        onClick={() => onFilterClick("all")}
        className="px-5 py-2 hover:bg-primary-700"
      >
        All cabins
      </button>
      <button
        onClick={() => onFilterClick("small")}
        className="px-5 py-2 hover:bg-primary-700"
      >
        1&mdash;3
      </button>
      <button
        onClick={() => onFilterClick("medium")}
        className="px-5 py-2 hover:bg-primary-700"
      >
        4&mdash;7
      </button>
      <button
        onClick={() => onFilterClick("large")}
        className="px-5 py-2 hover:bg-primary-700"
      >
        8&mdash;12
      </button>
    </div>
  );
};

export default Filter;
