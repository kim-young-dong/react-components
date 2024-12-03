import tw from "tailwind-styled-components";
import styles from "./CalendarStyle.module.css";
import classNames from "classnames";
import { DAY_OF_WEEK } from "./Calendar.constant";
import { set } from "lodash";

interface Day {
  day: number | string;
  isEmpthy: boolean;
  isDisabled: boolean;
}

function CalendarHeader({ year, month }: { year: number; month: number }) {
  return (
    <div className={styles.calendar_header}>
      {year}년 {month + 1}월
    </div>
  );
}

function CalendarWeeks() {
  return (
    <div className={styles.weekdays}>
      {DAY_OF_WEEK.map((day, idx) => {
        return <div key={idx}>{day}</div>;
      })}
    </div>
  );
}

export default function CalendarMonth({
  year,
  month,
  period,
  setPeriod,
  isStart,
}: {
  year: number;
  month: number;
  period: { startDate: Date; endDate: Date };
  setPeriod: (period: { startDate: Date; endDate: Date }) => void;
  isStart: { current: boolean };
}) {
  const FIRST_DAY = new Date(year, month, 1);
  const LAST_DAY = new Date(year, month + 1, 0);
  const IS_CURRENT_MONTH =
    year == new Date().getFullYear() && month == new Date().getMonth();

  let days: Day[] = [];

  const handleClick = (e: any, day: Day) => {
    if (day.isDisabled) return;

    if (day.day) {
      const date = new Date(year, month, Number(day.day));
      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);

      // handle click 이벤트 발생시마다 period의 startDate와 endDate를 번갈아가며 설정
      if (isStart.current) {
        if (date.getTime() > endDate.getTime()) {
          setPeriod({ startDate: date, endDate: date });
        } else {
          setPeriod({ startDate: date, endDate });
        }
        isStart.current = false;
      } else {
        if (date.getTime() < startDate.getTime()) {
          isStart.current = false;
          setPeriod({ startDate: date, endDate: date });
        } else {
          isStart.current = true;
          setPeriod({ startDate, endDate: date });
        }
      }
    }
  };

  const startOfDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const isSelected = (year: number, month: number, day: number | string) => {
    const startDate = new Date(period.startDate);
    const endDate = new Date(period.endDate);

    if (typeof day === "string") return false;

    const date = new Date(year, month, Number(day));

    return (
      startOfDay(date) >= startOfDay(startDate) &&
      startOfDay(date) <= startOfDay(endDate)
    );
  };

  const isEndPoints = (year: number, month: number, day: number | string) => {
    const startDate = new Date(period.startDate);
    const endDate = new Date(period.endDate);

    if (typeof day === "string") return false;

    const date = new Date(year, month, Number(day));

    return (
      startOfDay(date).getTime() === startOfDay(startDate).getTime() ||
      startOfDay(date).getTime() === startOfDay(endDate).getTime()
    );
  };

  const dynamicStyles = (day: Day) => {
    return classNames({
      [styles.empty]: day.isEmpthy,
      [styles.calendar_cell]: !day.isEmpthy,
      [styles.disabled]: day.isDisabled,
      [styles.selected]: isSelected(year, month, day.day),
      [styles.endpoints]: isEndPoints(year, month, day.day),
    });
  };

  const renderDays = () => {
    // Add empty days before the first day of the month
    for (let i = 0; i < FIRST_DAY.getDay(); i++) {
      days.push({ day: "", isEmpthy: true, isDisabled: false });
    }
    // Add days of the month
    for (let i = 1; i <= LAST_DAY.getDate(); i++) {
      if (IS_CURRENT_MONTH && i > new Date().getDate()) {
        days.push({
          day: i,
          isEmpthy: false,
          isDisabled: true,
        });
      } else {
        days.push({
          day: i,
          isEmpthy: false,
          isDisabled: false,
        });
      }
    }
  };
  renderDays();

  return (
    <>
      <div className={styles.month}>
        <CalendarHeader year={year} month={month} />
        <CalendarWeeks />
        <div className={styles.days}>
          {days.map((day, idx: number) => {
            return (
              <CalendarCell
                key={idx}
                className={dynamicStyles(day)}
                onClick={(e) => handleClick(e, day)}
              >
                {day.day}
              </CalendarCell>
            );
          })}
        </div>
      </div>
    </>
  );
}

const CalendarCell = tw.button`
  calendar_cell
  w-8 h-full
  flex-1 flex justify-center items-center
  
`;
