"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";
import tw from "tailwind-styled-components";

export default function Pagination({ maxPage }: { maxPage: number }) {
  const [width, setWidth] = useState(900);
  const [paginationArray, setPaginationArray] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = debounce(() => setWidth(window.innerWidth), 20);
      window.addEventListener("resize", handleResize);
    } else {
      return () => {
        // cleanup
        window.removeEventListener("resize", () => {
          return null;
        });
      };
    }
  }, []);
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
          <ArrowBtn
            onClick={() => {
              if (currentPage < 10) {
                setCurrentPage(1);
                return;
              }
              setCurrentPage(currentPage - 10);
            }}
          >
            <RxDoubleArrowLeft />
          </ArrowBtn>
          <ArrowBtn
            onClick={() => {
              if (currentPage === 1) return;
              setCurrentPage(currentPage - 1);
            }}
          >
            <IoIosArrowBack />
          </ArrowBtn>
          {paginationArray.map((page, index) => {
            return (
              <PageBtn
                key={index}
                $isActive={currentPage === page}
                onClick={() => {
                  page !== "..." && setCurrentPage(page);
                }}
              >
                {page}
              </PageBtn>
            );
          })}
          <>
            <ArrowBtn
              onClick={() => {
                if (currentPage === maxPage) return;
                setCurrentPage(currentPage + 1);
              }}
            >
              <IoIosArrowForward />
            </ArrowBtn>
            <ArrowBtn
              onClick={() => {
                if (currentPage > maxPage - 10) {
                  setCurrentPage(maxPage);
                  return;
                }
                setCurrentPage(currentPage + 10);
              }}
            >
              <RxDoubleArrowRight />
            </ArrowBtn>
          </>
        </div>
      </div>
    </div>
  );
}

const BtnSquare = tw.button`
  w-8 h-8
  flex justify-center items-center
  rounded-md
  transition-all duration-300
`;
const PageBtn = tw(BtnSquare)`
  ${({ $isActive = false }: { $isActive?: boolean }) =>
    $isActive ? `bg-blue-500 text-white	` : `hover:bg-blue-100`}
`;
const ArrowBtn = tw(BtnSquare)`
  bg-gray-200
  hover:bg-gray-300
`;
