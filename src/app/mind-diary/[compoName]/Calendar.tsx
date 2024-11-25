"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import CalendarModal from "../components/CalendarModal";
import tw from "tailwind-styled-components";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // [TODO] 현재 날짜로 초기화
  const [checkedDays, setCheckedDays] = useState<number[]>([1, 12, 23]);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const year = currentDate.getFullYear();
  const month = Number(
    (currentDate.getMonth() + 1).toString().padStart(2, "0")
  );
  const date = currentDate.getDate().toString().padStart(2, "0");

  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };
  const onDateChange = (num: number) => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + num)));
  };

  const onSelectDate = (e: { target: { innerHTML: any } }) => {
    setCheckedDays((prev) => {
      if (prev.includes(Number(e.target.innerHTML))) {
        return prev.filter((day) => day !== Number(e.target.innerHTML));
      } else {
        return [...prev, Number(e.target.innerHTML)];
      }
    });
    setCurrentDate(new Date(year, month, Number(e.target.innerHTML)));
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
                onClick={() => onDateChange(-1)}
              >
                <span className="w-1/2 h-full">{"<"}</span>
              </button>
              <div
                className="cursor-pointer w-[60%] text-center"
                onClick={toggleModal}
              >
                {year}.{month}.{date}
              </div>
              <button
                className="w-6 h-6 flex justify-center items-center"
                onClick={() => onDateChange(1)}
              >
                <span className="w-1/2 h-full">{">"}</span>
              </button>
            </DateSwiper>
          </div>
        </Card>
      </div>
      <CalendarModal
        isActive={isModalActive}
        currentDate={currentDate}
        checkedDays={checkedDays}
        onSelectDate={onSelectDate}
        toggleModal={toggleModal}
      />
    </>
  );
};
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

export default Calendar;
