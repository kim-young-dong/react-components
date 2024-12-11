"use client";
import { useState, useMemo } from "react";
import CalendarModal from "../components/Calendar/CalendarModal";
import tw from "tailwind-styled-components";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // [TODO] 현재 날짜로 초기화
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 12, 23]);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const year = useMemo(() => currentDate.getFullYear(), [currentDate]);
  const month = useMemo(() => currentDate.getMonth() + 1, [currentDate]);
  const date = useMemo(() => currentDate.getDate(), [currentDate]);

  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  const preveMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const onSelectDate = (year: number, month: number, day: number) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((item) => item !== day);
      } else {
        return [...prev, day];
      }
    });
    // setCurrentDate(new Date(year, month, day));
    // toggleModal(); // [TODO] 날짜 선택시 모달 닫기 (선택사항)
  };
  return (
    <>
      <div className="w-full max-w-[900px] px-4 m-auto absolute inset-x-0 top-28">
        <Card>
          <div className="w-full h-24 flex flex-col justify-around">
            <DateSwiper>
              <button
                className="w-6 h-6 flex justify-center items-center"
                onClick={preveMonth}
              >
                <span className="w-1/2 h-full">{"<"}</span>
              </button>
              <div
                className="cursor-pointer w-[60%] text-center"
                onClick={toggleModal}
              >
                {year}.{month.toString().padStart(2, "0")}.
                {date.toString().padStart(2, "0")}
              </div>
              <button
                className="w-6 h-6 flex justify-center items-center"
                onClick={nextMonth}
              >
                <span className="w-1/2 h-full">{">"}</span>
              </button>
            </DateSwiper>
          </div>
        </Card>
      </div>
      <CalendarModal
        year={year}
        month={month}
        currentDate={currentDate}
        preveMonth={preveMonth}
        nextMonth={nextMonth}
        isActive={isModalActive}
        selectedDays={selectedDays}
        onSelectDate={onSelectDate}
        toggleModal={toggleModal}
      />
    </>
  );
}
const Card = tw.div`
  card
  w-full min-w-[250px] min-h-4
  px-6 py-4
  flex flex-col items-center justify-center gap-4
  text-black
  rounded-2xl
  drop-shadow-md
  bg-white
`;

const DateSwiper = tw.div`
  w-full h-9
  flex
  items-center
  justify-center
  text-black
  font-semibold
`;
