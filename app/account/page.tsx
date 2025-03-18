import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest area",
};
const page =async () => {
  const session=await auth()
  const name=session?.user?.name
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Welcome {name},
      </h2>
    </div>
  );
}

export default page