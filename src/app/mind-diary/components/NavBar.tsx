"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SideMenu from "./SideMenu";
const NAV_ITEM = [
  {
    name: "달력",
    link: "calendar",
  },
  {
    name: "달력",
    link: "calendar",
  },
  {
    name: "달력",
    link: "calendar",
  },
  {
    name: "달력",
    link: "calendar",
  },
  {
    name: "달력",
    link: "calendar",
  },
];

export default function NavBar() {
  const [isModalActive, setIsModalActive] = useState(false);
  const pathName = usePathname();
  const isActiveMenu = (link: string) => {
    if (pathName.includes("/main/point") && link === "/main/point/group")
      return true;
    return pathName === link;
  };
  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <NavBarContainer>
      {NAV_ITEM.map((item) => {
        return (
          <NavItem key={item.name} $active={isActiveMenu(item.link)}>
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
      <GiHamburgerMenu className="cursor-pointer" onClick={toggleModal} />
      <SideMenu isActive={isModalActive} toggleModal={toggleModal} />
    </NavBarContainer>
  );
}

interface navItemProp {
  $active: boolean;
}
const NavBarContainer = tw.div`
  w-full h-12 
  px-4
  flex items-center justify-around
  bg-slate-500
`;

const NavItem = tw.button<navItemProp>`
  nav_item
  ${(props) =>
    props.$active
      ? `
      text-lg font-bold 
      after:content-[''] after:w-1 after:h-1 after:rounded-xl after:bg-white after:absolute after:bottom-[-8px] after:left-1/2
      `
      : `text-md`}
  cursor-pointer
  flex-1 text-center relative
`;
