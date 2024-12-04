import Calendar from "./components/Calendar/Calendar";
import tw from "tailwind-styled-components";
import Link from "next/link";
import { IoHome } from "react-icons/io5";

export default function ShortsNMusic() {
  return (
    <>
      <MenuBar>
        <Link href={"/"}>
          <IoHome size={28} color="white" />
        </Link>
        <div className="flex flex-col justify-center items-center relative">
          <Calendar />
        </div>
      </MenuBar>
    </>
  );
}

const MenuBar = tw.div`  
  flex justify-between items-center gap-4
  p-4
  bg-gray-800
`;
