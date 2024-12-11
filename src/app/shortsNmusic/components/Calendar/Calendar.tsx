"use client";
import { useState } from "react";
import CalendarContainer from "./CalendarContainer";

export default function Calendar() {
  const [period, setPeriod] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
  });
  const [dateOpen, setDateOpen] = useState(false);
  return (
    <>
      <button
        className=" bg-yellow-300 px-4 py-2 rounded-lg text-base"
        onClick={() => setDateOpen((prev) => !prev)}
      >
        <span>달력</span>
      </button>
      {dateOpen && <CalendarContainer period={period} setPeriod={setPeriod} />}
    </>
  );
}
