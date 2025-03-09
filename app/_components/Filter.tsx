"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const capacity = searchParams.get("capacity") || "all";
  const pathname = usePathname();
  const { replace } = useRouter();
  const onFilterClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="border border-primary-800 flex items-center">
      <Button
        value="all"
        capacity={capacity}
        onClick={() => onFilterClick("all")}
      >
        {" "}
        All cabins
      </Button>
      <Button
        value="small"
        capacity={capacity}
        onClick={() => onFilterClick("small")}
      >
        {" "}
        1&mdash;3
      </Button>
      <Button
        value="medium"
        capacity={capacity}
        onClick={() => onFilterClick("medium")}
      >
        {" "}
        4&mdash;7
      </Button>
      <Button
        value="large"
        capacity={capacity}
        onClick={() => onFilterClick("large")}
      >
        {" "}
        8&mdash;12
      </Button>
    </div>
  );
};

interface ButtonPropsType {
  children: ReactNode;
  capacity: string;
  onClick: (val: string) => void;
  value: string;
}

const Button = ({ children, capacity, onClick, value }: ButtonPropsType) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-5 py-2 ${
        capacity === value ? "bg-primary-700" : "hover:bg-primary-700"
      }`}
    >
      {children}
    </button>
  );
};

export default Filter;
