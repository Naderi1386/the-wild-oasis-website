import { Metadata } from "next";
import SignInButton from "../_components/SignInButton";

export const metadata:Metadata={
  title:'Login'
}

const page = () => {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}

export default page