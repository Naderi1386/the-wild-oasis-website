import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest area",
};
const page = () => {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Welcome Hosein,
      </h2>
    </div>
  );
}

export default page