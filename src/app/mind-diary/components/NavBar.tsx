"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";

const NAV_ITEM = [
  {
    name: "달력",
    link: "calendar",
  },
];

export default function NavBar() {
  const pathName = usePathname();
  const isActiveMenu = (link: string) => {
    if (pathName.includes("/main/point") && link === "/main/point/group")
      return true;
    return pathName === link;
  };

  return (
    <div className="flex items-center justify-around w-full h-12 bg-slate-500">
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
    </div>
  );
}

interface navItemProp {
  $active: boolean;
}

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
