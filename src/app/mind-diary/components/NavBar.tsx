"use client";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import SideMenu from "./SideMenu";
const NAV_ITEM = [
  {
    name: "달력",
    link: "calendar",
  },
  // {
  //   name: "달력",
  //   link: "calendar",
  // },
  // {
  //   name: "달력",
  //   link: "calendar",
  // },
  // {
  //   name: "달력",
  //   link: "calendar",
  // },
  // {
  //   name: "달력",
  //   link: "calendar",
  // },
];
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

export default function NavBar() {
  const [isModalActive, setIsModalActive] = useState(false);
  const pathName = usePathname();
  const params = useParams();
  const isActiveMenu = (link: string) => {
    return params?.compoName === link;
  };
  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <NavBarContainer>
      <div className="menu-left flex-1 flex gap-4">
        <NavItem>
          <Link href={"/"}>
            <IoHome size={28} color="white" />
          </Link>
        </NavItem>
        {NAV_ITEM.map((item) => {
          return (
            <NavItem key={item.name} $isActive={isActiveMenu(item.link)}>
              <Link
                href={`/mind-diary/${item.link}`}
                key={item.name}
                className="text-white"
              >
                {item.name}
              </Link>
            </NavItem>
          );
        })}
      </div>
      <NavItem onClick={toggleModal}>
        <GiHamburgerMenu size={20} color="white" className="cursor-pointer" />
      </NavItem>
      <SideMenu
        menuList={MENU_ITEMS}
        isActive={isModalActive}
        toggleModal={toggleModal}
      />
    </NavBarContainer>
  );
}
const NavBarContainer = tw.div`
  w-full h-16
  px-4
  flex items-center justify-around
  bg-red-300
`;

const NavItem = tw.button`
${({ $isActive }: { $isActive?: boolean }) => {
  return $isActive
    ? `
  text-lg font-bold 
  after:content-[''] after:w-1 after:h-1 
  after:rounded-xl after:bg-white 
  after:absolute after:bottom-[8px] after:left-1/2
  `
    : `text-md`;
}}
nav_item
min-w-[50px] h-16
flex items-center justify-center
cursor-pointer
text-center relative
`;
