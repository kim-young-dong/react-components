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
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:gap-12 p-2 lg:p-24">
      <h1 className="text-6xl font-bold">Project List</h1>
      <div className="grid lg:grid-cols-3 gap-4 h-fit">
        {PAGES.map((page, index) => (
          <Link key={page.title} href={page.href}>
            <Card title={page.title} imgUrl={page.imgUrl}>
              <p>{page.discription}</p>
            </Card>
          </Link>
        ))}
        {/* <Card title="Card 1" imgUrl="https://via.placeholder.com/1000">
          <p>Card 1 content</p>
        </Card>
        <Card title="Card 2" imgUrl="https://via.placeholder.com/1000">
          <p>
            Card 3 content Card 3 content Card 3 content Card 3 contentCard 3
            content Card 3 content Card 3 content Card 3 content Card 3 content
            Card 3 content Card 3 content Card 3 content
          </p>
        </Card>
        <Card title="Card 3" imgUrl="https://via.placeholder.com/1000">
          <p>
            Card 3 content Card 3 content Card 3 content Card 3 contentCard 3
            content Card 3 content Card 3 content Card 3 content Card 3 content
            Card 3 content Card 3 content Card 3 content
          </p>
        </Card> */}
      </div>
    </main>
  );
}
