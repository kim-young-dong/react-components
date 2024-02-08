"use client";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const MENU_ITEMS = [
  {
    title: "닉네임 설정",
    path: "/main/setting/nickname",
  },
  {
    title: "그룹관리",
    path: "/main/setting/group",
  },
  {
    title: "고객센터",
    path: "/main/check",
  },
];

export default function SideMenu({
  isActive,
  toggleModal,
}: {
  isActive: boolean;
  toggleModal: () => void;
}) {
  const logout = () => {
    // LocalStorage에서 토큰 제거
  };

  return (
    <>
      <SideMenuContainer $isActive={isActive}>
        <SideMenuContent $isActive={isActive}>
          <div className="w-full flex">
            <button className=" relative w-5 h-5" onClick={toggleModal}>
              <IoClose />
            </button>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-[#efeeed]">
              <FaUser size={50} />
            </div>
            <span className="text-lg">userName</span>
          </div>
          <MenuList>
            {MENU_ITEMS.map((item) => {
              return (
                <MenuItem key={item.title}>
                  <span>{item.title}</span>
                </MenuItem>
              );
            })}
            <RowDashBar />
            <MenuItem onClick={logout}>
              <CiLogout />
              <span>Log out</span>
            </MenuItem>
          </MenuList>
        </SideMenuContent>
        <BackGround />
      </SideMenuContainer>
    </>
  );
}

const SideMenuContainer = tw.div`
  side_menu
  ${({ $isActive }: { $isActive: boolean }) =>
    $isActive ? `opacity-100` : `opacity-0 pointer-events-none`}
  w-full h-full z-50 overflow-hidden
  flex justify-end items-center
  absolute top-0 left-0
  text-black
  transition-all duration-300
`;
const SideMenuContent = tw.div`
  side_menu_content
  ${({ $isActive }: { $isActive: boolean }) =>
    $isActive ? `translate-x-0` : `translate-x-full`}
  w-1/3 h-full p-2 z-50
  flex flex-col items-center 
  absolute top-0 right-0 
  bg-white
  transition-all duration-300
`;
const MenuList = tw.div`
  w-full h-full
  px-2
  flex flex-col items-center
`;
const MenuItem = tw.div`
  w-full h-10
  flex items-center gap-1
  text-sm text-gray-400 font-normal cursor-pointer
`;
const BackGround = tw.div`
  w-full h-full
  z-10
  absolute top-0 left-0
  bg-black
  bg-opacity-70
`;
const RowDashBar = tw.div`
  row_dash_bar
  w-full
  h-[1px]
  my-1
  bg-gray-200
`;
