import { useCallback, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import {
  addDays,
  addHours,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { PopoverContext } from "@components/commons/Popover";
import { IconArrowWhiteLeft, IconArrowWhiteRight } from "@utils/icon";

type CalendarProps = {
  type?: "popover" | "modal";
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
};

export default function Calendar({ onDateSelect, selectedDate, type = "popover" }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  const { closePopover } = useContext(PopoverContext);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const weeks = Math.ceil(
    (calendarEnd.getTime() - calendarStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );

  const generateDays = useCallback(
    (startDate: Date) => Array.from({ length: 7 }, (_, i) => addDays(startDate, i)),
    []
  );

  const generateCalendar = () =>
    Array.from({ length: weeks }, (_, weekIndex) => {
      const weekStart = addWeeks(calendarStart, weekIndex);
      return {
        days: generateDays(weekStart),
        key: `week-${format(weekStart, "yyyy-MM-dd")}-${weekIndex}`,
      };
    });

  const renderDay = useCallback(
    (day: Date) => {
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isSelected = isSameDay(day, selectedDate);

      return (
        <div
          key={format(day, "yyyy-MM-dd")}
          className={classNames("rounded-full p-8 text-center", {
            "cursor-pointer": isCurrentMonth,
            "text-text-default opacity-50": !isCurrentMonth,
            "bg-brand-primary/20 text-brand-primary": isSelected,
            "text-brand-primary/80": !isSelected && isSameDay(day, new Date()),
            "hover:bg-brand-primary/20 hover:text-brand-primary":
              isCurrentMonth && (!isSelected || isSameDay(day, new Date())),
          })}
          onClick={() => {
            if (isCurrentMonth) {
              onDateSelect(addHours(day, 9));
              if (type === "popover") {
                closePopover();
              }
            }
          }}
        >
          {format(day, "d")}
        </div>
      );
    },
    [monthStart, selectedDate, onDateSelect, type, closePopover]
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  }, []);

  return (
    <div className="w-282 rounded-24 bg-background-secondary p-16 text-14">
      <div className="flex items-center justify-between py-5">
        <IconArrowWhiteLeft
          className="text-white cursor-pointer transition-colors duration-200 hover:text-brand-primary"
          onClick={handlePrevMonth}
        />
        <div className="text-center">{format(currentMonth, "MMMM yyyy")}</div>
        <IconArrowWhiteRight
          className="text-white cursor-pointer transition-colors duration-200 hover:text-brand-primary"
          onClick={handleNextMonth}
        />
      </div>
      <div className="grid grid-cols-7 py-10">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>
      {generateCalendar().map((week) => (
        <div key={week.key} className="grid grid-cols-7 font-semibold">
          {week.days.map(renderDay)}
        </div>
      ))}
    </div>
  );
}
