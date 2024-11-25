"use client";
import { useParams } from "next/navigation";
import Calendar from "./Calendar";

export default function MindDiary() {
  const { compoName } = useParams();
  const contents = () => {
    switch (compoName) {
      case "calendar":
        return <Calendar />;
      default:
        return <Calendar />;
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {contents()}
      </div>
    </>
  );
}
