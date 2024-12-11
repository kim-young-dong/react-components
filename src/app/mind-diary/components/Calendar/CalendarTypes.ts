// types.ts
import { z } from "zod";

// 공통 타입 정의
export const DateFunctionSchema = z
  .function()
  .args(z.number(), z.number(), z.number())
  .returns(z.void());

export const ToggleFunctionSchema = z.function().args().returns(z.void());

export const CalendarModalPropsSchema = z.object({
  year: z.number(),
  month: z.number(),
  isActive: z.boolean().default(false),
  currentDate: z.date().default(() => new Date()),
  selectedDays: z.array(z.number()).default([]),
  toggleModal: ToggleFunctionSchema,
  preveMonth: ToggleFunctionSchema,
  nextMonth: ToggleFunctionSchema,
  onSelectDate: DateFunctionSchema,
});

// 타입 추출
export type CalendarModalProps = z.infer<typeof CalendarModalPropsSchema>;

export const CalendarCellPropsSchema = z.object({
  children: z.any(),
  isCheckedDays: z.boolean(),
  isCurrentMonth: z.boolean(),
  onSelectDate: ToggleFunctionSchema,
});

export type CalendarCellProps = z.infer<typeof CalendarCellPropsSchema>;

export const CalendarHeaderPropsSchema = z.object({
  currentDate: z.date(),
  preveMonth: ToggleFunctionSchema,
  nextMonth: ToggleFunctionSchema,
});

export type CalendarHeaderProps = z.infer<typeof CalendarHeaderPropsSchema>;

export const CalendarBodyPropsSchema = z.object({
  year: z.number(),
  month: z.number(),
  selectedDays: z.array(z.number()),
  onSelectDate: DateFunctionSchema,
});

export type CalendarBodyProps = z.infer<typeof CalendarBodyPropsSchema>;

export const CalendarModalContentPropsSchema = z.object({
  year: z.number(),
  month: z.number(),
  currentDate: z.date(),
  preveMonth: ToggleFunctionSchema,
  nextMonth: ToggleFunctionSchema,
  selectedDays: z.array(z.number()),
  onSelectDate: DateFunctionSchema,
});

export type CalendarModalContentProps = z.infer<
  typeof CalendarModalContentPropsSchema
>;
