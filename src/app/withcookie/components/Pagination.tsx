"use client";
import { useEffect, useState } from "react";

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    }; //value 변경 시점에 clearTimeout을 해줘야함.
  }, [value, delay]);

  return debouncedValue;
};

export default function Pagination({
  maxPage,
  currentPage = 1,
}: {
  maxPage: number;
  currentPage: number;
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const [paginationArray, setPaginationArray] = useState<any[]>([]);
  const debouncedWidth = useDebounce(window.innerWidth, 200);
  useEffect(() => {
    const handleResize = () => {
      setWidth(debouncedWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, [debouncedWidth]);
  useEffect(() => {
    let viewPage = Math.floor(Number(width) / 56);
    if (viewPage > 21) {
      viewPage = 21;
    } else if (7 > viewPage) {
      viewPage = 7;
    } else if (viewPage % 2 === 0) {
      viewPage += 1;
    }
    let half = Math.floor(viewPage / 2);
    if (half % 2 !== 0) {
      half += 1;
    }

    if (maxPage > viewPage) {
      if (half - 1 > currentPage || currentPage > maxPage - (half - 2)) {
        let front = Array.from({ length: half - 1 }, (e, i) => i + 1);
        let back = Array.from(
          { length: half - 1 },
          (e, i) => i + maxPage - (half - 2)
        );
        setPaginationArray([...front, "...", ...back]);
      } else {
        let arr = Array.from(
          { length: viewPage - half },
          (e, i) => i + currentPage - Math.floor((viewPage - half) / 2)
        );
        setPaginationArray([1, "...", ...arr, "...", maxPage]);
      }
    } else {
      setPaginationArray(Array.from({ length: maxPage }, (e, i) => i + 1));
    }
  }, [maxPage, currentPage, width]);
  return (
    <div className="flex w-full items-center justify-center px-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-1 justify-center gap-2">
          <button className="btn-square btn"></button>
        </div>
      </div>
    </div>
  );
}
