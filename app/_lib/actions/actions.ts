"use server";

import { auth } from "@/auth";
import { GuestUpdatedType, updateGuest } from "../data-service";
import { revalidatePath } from "next/cache";

export const updateProfile = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData
    .get("nationality")
    ?.toString()
    .split("%") as string[];
  if (!/^[a-zA-Z0-9]{6,12}$/.test(String(nationalID)))
    throw new Error("Please provide a valid national ID");
  // @ts-expect-error err
  const guestId = session.user?.guestId as number;
  const updatedItems: GuestUpdatedType = {
    countryFlag,
    nationalID: Number(nationalID),
    nationality,
  };
   await updateGuest(guestId,updatedItems)
   revalidatePath("/account/profile")
};
