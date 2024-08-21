import { useRef, useState } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import useOutsideClick from "@hooks/useOutsideClick";
import Calendar from "./Calendar";

type Props = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};
export default function DateSelector({ selectedDate, onDateChange }: Props) {
  const calendarDropdownRef = useRef<HTMLDivElement>(null);
  const calendarExceptionRef = useRef<HTMLInputElement>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  useOutsideClick(calendarDropdownRef, () => setOpenCalendar(false), [calendarExceptionRef]);

  const handleDateSelect = (newDate: Date) => {
    onDateChange(newDate);
    setOpenCalendar(false);
  };

  const dateClassName = classNames(
    "w-full rounded-12 border border-solid bg-background-secondary px-16 py-14 hover:border-brand-primary",
    {
      "border-brand-primary": openCalendar,
      "border-border-primary": !openCalendar,
    }
  );

  return (
    <div>
      <input
        className={dateClassName}
        type="text"
        ref={calendarExceptionRef}
        onClick={() => setOpenCalendar((prev) => !prev)}
        placeholder={format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })}
        readOnly
      />
      {openCalendar && (
        <div
          ref={calendarDropdownRef}
          className="relative my-8 rounded-12 border border-solid border-brand-primary"
        >
          <Calendar type="modal" selectedDate={selectedDate} onDateSelect={handleDateSelect} />
        </div>
      )}
    </div>
  );
}
