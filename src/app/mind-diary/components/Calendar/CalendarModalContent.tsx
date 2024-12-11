import tw from "tailwind-styled-components";
import {
  CalendarModalContentProps,
  CalendarHeaderProps,
  CalendarBodyProps,
  CalendarCellProps,
} from "./CalendarTypes";
import { MONTH_TEXT, DAY_OF_WEEK } from "./CalendarConstants";

function CalendarCell({
  children,
  isCheckedDays,
  isCurrentMonth,
  onSelectDate,
}: CalendarCellProps) {
  return (
    <Cell
      $checkedDays={isCheckedDays}
      $currentMonth={isCurrentMonth}
      onClick={onSelectDate}
    >
      {children}
    </Cell>
  );
}
const Cell = tw.button`
  ${({
    $checkedDays = true,
    $currentMonth = false,
  }: {
    $checkedDays?: boolean;
    $currentMonth?: boolean;
  }) => {
    if (!$currentMonth) return `text-gray-300`;
    if ($checkedDays) return `bg-primary text-white`;
  }}
  calendar_cell
  w-8 h-full
  flex-1 flex justify-center items-center
`;

function CalendarHeader({
  currentDate,
  preveMonth,
  nextMonth,
}: CalendarHeaderProps) {
  return (
    <>
      <div className="flex justify-around items-center w-full">
        <button
          className="w-6 h-6 flex justify-center items-center"
          onClick={preveMonth}
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
          <span className="font-bold">
            {MONTH_TEXT[currentDate.getMonth()]}
          </span>{" "}
          {currentDate.getFullYear()}
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
    </>
  );
}

function CalendarBody({
  year,
  month,
  selectedDays,
  onSelectDate,
}: CalendarBodyProps) {
  // const year = date.getFullYear();
  // const month = date.getMonth();

  const calendarCellFactory = (type: number, day: number) => {
    return (
      <CalendarCell
        key={`${type}-${day}`}
        isCheckedDays={selectedDays.includes(day)}
        isCurrentMonth={type === 1}
        onSelectDate={() => type === 1 && onSelectDate(year, month - 1, day)}
      >
        {day}
      </CalendarCell>
    );
  };
  const generateCalendarMatrix = () => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0).getDate();
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
  const calendarMatrix = generateCalendarMatrix();
  return (
    <>
      <Days>
        {DAY_OF_WEEK.map((item, index) => {
          return (
            <div key={index} className="text-center py-4">
              {item}
            </div>
          );
        })}
      </Days>
      <Dates>
        {calendarMatrix.map((week, index) => (
          <div
            key={index}
            className="w-full h-10 flex justify-around items-center gap-2 text-xs"
          >
            {week.map((day, dayIndex) => day)}
          </div>
        ))}
      </Dates>
    </>
  );
}
const Days = tw.div`
  days
  w-full h-10
  flex justify-around items-center gap-2
  text-red-300 border-b-2
`;
const Dates = tw.div`
  dates
  w-full mt-4
  flex flex-col justify-center gap-1
`;

export default function CalendarModalContent({
  year,
  month,
  currentDate,
  selectedDays,
  preveMonth,
  nextMonth,
  onSelectDate,
}: CalendarModalContentProps) {
  return (
    <Container>
      {/* CalendarHeader */}
      <CalendarHeader
        currentDate={currentDate}
        preveMonth={preveMonth}
        nextMonth={nextMonth}
      />
      {/* CalendarBody */}
      <CalendarBody
        year={year}
        month={month}
        selectedDays={selectedDays}
        onSelectDate={onSelectDate}
      />
    </Container>
  );
}

const Container = tw.div`
  calendar_modal_content
  w-[80%] min-w-[260px] max-w-[400px] z-10 p-5 bg-white rounded-xl
  flex flex-col gap-4
`;
