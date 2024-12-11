import tw from "tailwind-styled-components";
import CalendarModalContent from "./CalendarModalContent";
import { CalendarModalProps } from "./CalendarTypes";

export default function CalendarModal({
  year,
  month,
  isActive = false,
  currentDate = new Date(),
  selectedDays = [],
  toggleModal,
  onSelectDate,
  preveMonth,
  nextMonth,
}: CalendarModalProps) {
  return (
    <>
      <CalendarModalContainer $isActive={isActive}>
        <CalendarModalContent
          year={year}
          month={month}
          currentDate={currentDate}
          preveMonth={preveMonth}
          nextMonth={nextMonth}
          selectedDays={selectedDays}
          onSelectDate={onSelectDate}
        />
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

const BackGround = tw.div`
  w-full h-full
  absolute top-0 left-0
  bg-black bg-opacity-70
`;
