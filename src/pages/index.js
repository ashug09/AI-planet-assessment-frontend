import Image from "next/image";
import { Inter } from "next/font/google";
import SideNav from "./components/sideNav/sideNav";
import NewChat from "./components/newChat/newChat";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex">
        <SideNav />
        <NewChat />
      </div>
    </>
  );
}
