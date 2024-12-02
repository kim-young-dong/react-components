import React, { useState } from "react";
import CalendarMonth from "./CalendarMonth";
import { CURRENT_YEAR } from "./Calendar.constant";

export default function CalendarBody({ year }: { year: number }) {
  const [period, setPeriod] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
  });

  const calendars = [];

  // Render calendar
  // 역순으로 달력 표시
  if (year == CURRENT_YEAR) {
    for (let month = 0; month <= new Date().getMonth(); month++) {
      calendars.push([year, month]);
    }
  } else {
    for (let month = 0; month < 12; month++) {
      calendars.push([year, month]);
    }
  }

  return (
    <>
      {calendars.map((calendar, idx) => {
        return (
          <CalendarMonth
            key={idx}
            year={calendar[0]}
            month={calendar[1]}
            period={period}
            setPeriod={setPeriod}
          />
        );
      })}
    </>
  );
}
