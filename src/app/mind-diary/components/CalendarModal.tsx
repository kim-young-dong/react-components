import tw from "tailwind-styled-components";
import { useState } from "react";

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
  isActive = false,
  currentDate = new Date(),
  checkedDays = [],
  toggleModal,
  onSelectDate,
}: {
  isActive: boolean;
  currentDate: Date;
  checkedDays: number[];

  toggleModal: () => void;
  onSelectDate: (e: any) => void;
}) {
  const [date, setdate] = useState(currentDate); // [TODO] 현재 날짜로 초기화

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const calendarCellFactory = (type: number, day: number) => {
    return (
      <CalendarCell
        $checkedDays={checkedDays.includes(day)}
        $currentMonth={type === 1}
        key={`${type}-${day}`}
        onClick={onSelectDate}
      >
        {day}
      </CalendarCell>
    );
  };
  const generateCalendarMatrix = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();
    const weeksInMonth = Math.ceil((startingDay + lastDayOfMonth) / 7);
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    const matrix = [];
    let dayCounter = 1;

    for (let i = 0; i < weeksInMonth; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          // 이전 달의 날짜
          const pervDay = calendarCellFactory(
            0,
            lastDayOfPrevMonth - startingDay + j + 1
          );
          week.push(pervDay);
        } else if (dayCounter > lastDayOfMonth) {
          // 다음 달의 날짜
          const nextDay = calendarCellFactory(2, dayCounter - lastDayOfMonth);
          week.push(nextDay);
          dayCounter++;
        } else {
          // 현재 달의 날짜
          const day = calendarCellFactory(1, dayCounter);
          week.push(day);
          dayCounter++;
        }
      }
      matrix.push(week);
    }

    return matrix;
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
        <CalendarModalContent>
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
              >
                {"<"}
              </span>
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
              >
                {">"}
              </span>
            </button>
          </div>
          <div className="flex justify-around items-center w-full text-xs text-red-300 border-b-2">
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
        </CalendarModalContent>
        <BackGround onClick={toggleModal} />
      </CalendarModalContainer>
    </>
  );
}

const CalendarModalContainer = tw.div`
  calendar_modal_container
  ${({ $isActive }: { $isActive: boolean }) =>
    $isActive ? `opacity-100` : `opacity-0 pointer-events-none`}
  w-full h-full
  flex items-center justify-center z-20
  absolute top-0 left-0
  text-black
  transition-all duration-300
`;
const CalendarModalContent = tw.div`
  calendar_modal_content
  w-[80%] min-w-[260px] max-w-[400px] z-10 p-5 bg-white rounded-xl
  flex flex-col gap-4
`;
const BackGround = tw.div`
  w-full h-full
  absolute top-0 left-0
  bg-black bg-opacity-70
`;
const CalendarCell = tw.button`
  ${({
    $checkedDays = true,
    $currentMonth = false,
  }: {
    $checkedDays?: boolean;
    $currentMonth?: boolean;
  }) => {
    if (!$currentMonth) return `text-gray-300`;
    if ($checkedDays) return `bg-primary text-white`;
    return `border-[1px] border-primary`;
  }}
  calendar_cell
  w-8 h-full
  flex-1 flex justify-center items-center
  rounded-full
`;
