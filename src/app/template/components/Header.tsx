"use client";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import SideMenu from "./SideMenu";

const MENU_ITEMS = [
  {
    title: "악세서리",
    path: "/",
  },
  {
    title: "뉴스&이벤트",
    path: "/",
  },
  {
    title: "매장찾기",
    path: "/",
  },
  {
    title: "고객센터",
    path: "/",
  },
  {
    title: "주문하기",
    path: "/",
  },
  {
    title: "장바구니",
    path: "/",
  },
  {
    title: "마이페이지",
    path: "/",
  },
];

export default function Header() {
  const [isModalActive, setIsModalActive] = useState(false);
  const params = useParams();
  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <>
      <NavBarContainer>
        {/* menu-togle */}
        <NavItem onClick={toggleModal}>
          <GiHamburgerMenu size={28} color="white" className="cursor-pointer" />
        </NavItem>
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src="https://via.placeholder.com/550X200/ff0/000?text=Logo"
            alt="logo"
            width={550}
            height={200}
          />
        </Link>
      </NavBarContainer>
      <SideMenu
        menuList={MENU_ITEMS}
        isActive={isModalActive}
        toggleModal={toggleModal}
      />
    </>
  );
}
const NavBarContainer = tw.header`
  fixed top-0 z-50
  w-full px-4 mt-4
  flex gap-4
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
