import Link from "next/link";
import Card from "./components/Card";

const PAGES = [
  {
    title: "mind-diary",
    href: "/mind-diary",
    imgUrl: "/mind-diary.png",
    discription: "마음 일기장 프로젝트.",
  },
  {
    title: "withcookie",
    href: "/withcookie",
    imgUrl: "/withcookie.png",
    discription: "폐쇄형 쇼핑몰 리뉴얼 프로젝트.",
  },
  {
    title: "shortsNmusic",
    href: "/shortsNmusic",
    imgUrl: "/shortsNmusic.png",
    discription: "숏폼 제작자 음원 제공 서비스.",
  },
  {
    title: "openLogo",
    href: "/openLogo",
    imgUrl: "/openLogo.png",
    discription: "로고 제작 서비스.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:gap-12 p-2 lg:p-24">
      <h1 className="text-6xl font-bold">Project List</h1>
      <div className="grid lg:grid-cols-[repeat(3,minmax(auto,300px))] gap-4 h-fit">
        {PAGES.map((page, index) => (
          <Link key={page.title} href={page.href}>
            <Card title={page.title} imgUrl={page.imgUrl}>
              <p>{page.discription}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
