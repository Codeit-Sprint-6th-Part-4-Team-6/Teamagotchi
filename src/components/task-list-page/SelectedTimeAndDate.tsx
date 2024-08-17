import { useRef, useState } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import useOutsideClick from "@hooks/useOutsideClick";
import Calendar from "./Calendar";
import TimeSelector from "./Time";

type Props = {
  selectedDate: Date;
  selectedTime: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
};
export default function SelectDateAndTime({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
}: Props) {
  const calendarDropdownRef = useRef<HTMLDivElement>(null);
  const calendarExceptionRef = useRef<HTMLInputElement>(null);
  const timerDropdownRef = useRef<HTMLDivElement>(null);
  const timerExceptionRef = useRef<HTMLInputElement>(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  useOutsideClick(calendarDropdownRef, () => setOpenCalendar(false), [calendarExceptionRef]);
  useOutsideClick(timerDropdownRef, () => setOpenTime(false), [timerExceptionRef]);

  const handleDateSelect = (newDate: Date) => {
    onDateChange(newDate);
    setOpenCalendar(false);
  };

  const dateClassName = classNames(
    "w-204 rounded-12 border border-solid bg-background-secondary px-16 py-14 hover:border-brand-primary",
    {
      "border-brand-primary": openCalendar,
      "border-border-primary": !openCalendar,
    }
  );

  const timeClassName = classNames(
    "w-full rounded-12 border border-solid bg-background-secondary px-16 py-14 hover:border-brand-primary",
    {
      "border-brand-primary": openTime,
      "border-border-primary": !openTime,
    }
  );

  return (
    <div>
      <div className="flex gap-8">
        <input
          className={dateClassName}
          type="text"
          ref={calendarExceptionRef}
          onClick={() => setOpenCalendar((prev) => !prev)}
          placeholder={format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })}
          readOnly
        />
        <input
          onClick={() => setOpenTime((prev) => !prev)}
          className={timeClassName}
          type="text"
          ref={timerExceptionRef}
          placeholder={selectedTime}
          readOnly
        />
      </div>
      {openCalendar && (
        <div
          ref={calendarDropdownRef}
          className="relative top-8 rounded-12 border border-solid border-brand-primary"
        >
          <Calendar type="modal" selectedDate={selectedDate} onDateSelect={handleDateSelect} />
        </div>
      )}
      {openTime && (
        <div
          ref={timerDropdownRef}
          className="relative top-8 rounded-12 border border-solid border-brand-primary"
        >
          <TimeSelector selectedTime={selectedTime} onTimeChange={onTimeChange} />
        </div>
      )}
    </div>
  );
}
