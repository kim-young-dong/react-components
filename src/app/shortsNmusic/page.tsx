"use client";
import { useState } from "react";
import Calendar from "./components/Calendar/CalendarContainer";

export default function ShortsNMusic() {
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <button onClick={() => setDateOpen((prev) => !prev)}>
          <span>달력</span>
        </button>
        {dateOpen && <Calendar />}
      </div>
    </>
  );
}
