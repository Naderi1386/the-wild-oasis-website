import { ReactNode } from "react";
import "@/app/_styles/globals.css";
import { Metadata } from "next";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

interface RootLayoutPropsType {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutPropsType) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative  antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col mid-h-min-h-screen`}
      >
        <Header />
        <div className="grow ">
          <main className="max-w-[80rem] mx-auto py-12 px-8 ">{children}</main>
        </div>
      </body>
    </html>
  );
}
