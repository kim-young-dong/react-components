import Card from "./components/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <h1 className="text-6xl font-bold">Welcome to Tailwind CSS</h1>
      <div className="grid grid-cols-3 gap-4 h-fit">
        <Card title="Card 1" imgUrl="https://via.placeholder.com/1000">
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
        </Card>
      </div>
    </main>
  );
}
