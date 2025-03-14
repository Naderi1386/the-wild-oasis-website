"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { RangeType } from "../_components/DateSelector";

interface ReservationContextType {
  range: RangeType;
  handleChangeRange: (range: RangeType) => void;
  resetRange: () => void;
}

export const globalReservationContext =
  createContext<ReservationContextType | null>(null);

interface ReservationContextProviderPropsType {
  children: ReactNode;
}

const ReservationContextProvider = ({
  children,
}: ReservationContextProviderPropsType) => {
  const [range, setRange] = useState<RangeType>({
    from: undefined,
    to: undefined,
  });
  const handleChangeRange = (newRange: RangeType) => {
    setRange(newRange);
  };
  const resetRange = () => {
    setRange({ from: undefined, to: undefined });
  };
  return (
    <globalReservationContext.Provider
      value={{ range, handleChangeRange, resetRange }}
    >
      {children}
    </globalReservationContext.Provider>
  );
};

export default ReservationContextProvider;

export const useReservationContext = () => {
  const context = useContext(globalReservationContext);
  if (context === undefined)
    console.log("You must use the context inside the provider");
  return context as ReservationContextType;
};
