import { useContext, useState } from "react";
import classNames from "classnames";
import {
  addDays,
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
import Popover, { PopoverContext } from "@components/commons/Popover";
import { IconArrowWhiteLeft, IconArrowWhiteRight, IconCalenderBg } from "@utils/icon";

type CalendarProps = {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
};

function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { closePopover } = useContext(PopoverContext);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const weeks = Math.ceil(
    (calendarEnd.getTime() - calendarStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );

  const generateDays = (startDate: Date) =>
    Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const generateCalendar = () =>
    Array.from({ length: weeks }, (_, weekIndex) => {
      const weekStart = addWeeks(calendarStart, weekIndex);
      return {
        days: generateDays(weekStart),
        key: `week-${format(weekStart, "yyyy-MM-dd")}-${weekIndex}`,
      };
    });

  const renderDay = (day: Date) => {
    const isCurrentMonth = isSameMonth(day, monthStart);
    const isSelected = isSameDay(day, selectedDate);

    return (
      <div
        key={format(day, "yyyy-MM-dd")}
        className={classNames("p-8 text-center", {
          "cursor-pointer": isCurrentMonth,
          "text-text-default opacity-50": !isCurrentMonth,
          "text-brand-primary": isSameDay(day, new Date()),
          "rounded-8 bg-brand-primary text-background-primary": isSelected,
          "rounded-8 hover:bg-brand-primary hover:text-background-primary":
            isCurrentMonth && !isSameDay(day, new Date()),
        })}
        onClick={() => {
          if (isCurrentMonth) {
            onDateSelect(day);
            closePopover();
          }
        }}
      >
        {format(day, "d")}
      </div>
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };

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

export default function CalendarPopover({ onDateSelect, selectedDate }: CalendarProps) {
  return (
    <Popover>
      <Popover.Toggle>
        <IconCalenderBg className="cursor-pointer" />
      </Popover.Toggle>
      <Popover.Wrapper>
        <Calendar onDateSelect={onDateSelect} selectedDate={selectedDate} />
      </Popover.Wrapper>
    </Popover>
  );
}
