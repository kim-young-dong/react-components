import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

const monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function CalendarModal({
  isActive,
  currentDate,
  onFullDateChange,
  toggleModal,
}: {
  isActive: boolean;
  currentDate: Date;
  onFullDateChange: (year: number, month: number, date: number) => void;
  toggleModal: () => void;
}) {
  const [date, setdate] = useState(currentDate); // [TODO] 현재 날짜로 초기화
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const generateCalendarMatrix = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();
    const weeksInMonth = Math.ceil((startingDay + lastDayOfMonth) / 7);
    const lastDayOfPrevMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const matrix = [];
    let dayCounter = 1;

    for (let i = 0; i < weeksInMonth; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          // 이전 달의 날짜
          const pervDay = (
            <CalendarCell
              key={lastDayOfMonth - startingDay + j + 1}
              className="text-[#ccc7e1]"
            >
              {lastDayOfPrevMonth - startingDay + j + 1}
            </CalendarCell>
          );
          week.push(pervDay);
        } else if (dayCounter > lastDayOfMonth) {
          // 다음 달의 날짜
          const nextDay = (
            <CalendarCell
              key={dayCounter - lastDayOfMonth}
              className="text-[#ccc7e1]"
            >
              {dayCounter - lastDayOfMonth}
            </CalendarCell>
          );
          week.push(nextDay);
          dayCounter++;
        } else {
          // 현재 달의 날짜
          const day = (
            <CalendarCell
              $currentMonth={true}
              key={dayCounter}
              onClick={(e) => {
                const target = e.target as HTMLDivElement;
                onFullDateChange(year, month, Number(target.innerHTML));
                toggleModal();
              }}
            >
              {dayCounter}
            </CalendarCell>
          );
          week.push(day);
          dayCounter++;
        }
      }
      matrix.push(week);
    }

    return matrix;
  };
  const isCurrentDate = (day: number) => {
    return (
      currentDate.getFullYear() === year &&
      currentDate.getMonth() === month &&
      currentDate.getDate() === day
    );
  };

  const prevMonth = () => {
    setdate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setdate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };
  const calendarMatrix = generateCalendarMatrix();
  return (
    <>
      <CalendarModalContainer $isActive={isActive}>
        <Calendar>
          <div className="flex justify-around items-center w-full">
            <button
              className="w-6 h-6 flex justify-center items-center"
              onClick={prevMonth}
            >
              <span
                className="w-1/2 h-full block bg-no-repeat bg-ico-common"
                style={{
                  backgroundPositionX: "-15px",
                  backgroundPositionY: "-70px",
                  backgroundSize: "390px",
                }}
              />
            </button>
            <div className="text-xl">
              <span className="font-bold">{monthText[date.getMonth()]}</span>{" "}
              {date.getFullYear()}
            </div>
            <button
              className="w-6 h-6 flex justify-center items-center"
              onClick={nextMonth}
            >
              <span
                className="w-1/2 h-full block bg-no-repeat bg-ico-common"
                style={{
                  backgroundPositionX: "0px",
                  backgroundPositionY: "-70px",
                  backgroundSize: "390px",
                }}
              />
            </button>
          </div>
          <div className="flex border-[] justify-around items-center w-full text-xs text-red-300 border-b-2">
            {dayOfWeek.map((item, index) => {
              return (
                <div key={index} className="text-center py-4">
                  {item}
                </div>
              );
            })}
          </div>
          <div className="w-full mt-4 flex flex-col justify-center gap-1">
            {calendarMatrix.map((week, index) => (
              <div
                key={index}
                className="w-full h-10 flex justify-around items-center gap-2 text-xs"
              >
                {week.map((day, dayIndex) => day)}
              </div>
            ))}
          </div>
        </Calendar>
        <BackGround onClick={toggleModal} />
      </CalendarModalContainer>
    </>
  );
}

const CalendarModalContainer = tw.div`
  calendar_modal_container
  ${({ $isActive }: { $isActive: boolean }) =>
    $isActive ? `flex items-center justify-center z-20` : `hidden`}
  w-full h-full
  absolute top-0 left-0
  text-black
`;
const Calendar = tw.div`
  calendar
  w-[50%] min-w-[260px] 
  z-10 p-5 
  bg-white rounded-xl
`;
const BackGround = tw.div`
  w-full h-full
  absolute top-0 left-0
  bg-black bg-opacity-70
`;
const CalendarCell = tw.button`
  ${({
    $notCheckDays = true,
    $currentMonth = false,
  }: {
    $notCheckDays?: boolean;
    $currentMonth?: boolean;
  }) =>
    $notCheckDays
      ? `${$currentMonth && "border-[1px] border-primary"}`
      : `bg-primary text-white`}
  w-8 h-full
  flex-1  flex justify-center items-center
  rounded-full
`;
