import tw from "tailwind-styled-components";
import styles from "./CalendarModal.module.css";
import { useState, useRef, useEffect } from "react";
import CalendarBody from "./CalendarBody";
import { CURRENT_YEAR } from "./Calendar.constant";

export default function Calendar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const YEAR_RANGE = 10;
  let years = [];

  for (let i = YEAR_RANGE - 1; i >= 0; i--) {
    // 역순으로 달력 표시
    const year = CURRENT_YEAR - i;
    years.push(year);
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current?.scrollHeight;
    }
  }, []);

  return (
    <>
      <Container className={styles.scrollable_calendar} ref={containerRef}>
        {years.map((year, idx) => {
          return (
            <div key={idx} className={styles.calendar}>
              <div className={styles.calendar_header}>{year}년</div>
              <div className={styles.calendar_body}>
                <CalendarBody year={year} />
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
}

const Container = tw.div`
  scrollable-calendar
`;
