"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

interface DeleteReservationPropsType {
  bookingId: string;
  onDelete: (bookingId: number) => void;
}

function DeleteReservation({
  bookingId,
  onDelete,
}: DeleteReservationPropsType) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this reservation ?")) {
      startTransition(() => {
        onDelete(Number(bookingId));
      });
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          {" "}
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
          <span>{bookingId}</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
