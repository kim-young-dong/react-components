"use client";
import { useState } from "react";
import Calendar from "./components/Calendar/Calendar";

export default function ShortsNMusic() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Calendar />
      </div>
    </>
  );
}
