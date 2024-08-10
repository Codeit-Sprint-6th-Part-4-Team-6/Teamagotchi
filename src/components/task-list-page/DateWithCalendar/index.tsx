import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import TextButton from "@components/commons/Button/TextButton";
import { IconArrowLeftBg, IconArrowRightBg } from "@utils/icon";
import CalendarPopover from "../Calendar";

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
};

export default function DateWithCalendar({ date, onDateChange }: Props) {
  const handleDateSelect = (newDate: Date) => {
    onDateChange(newDate);
  };

  const handlePrevDay = () => {
    onDateChange(addDays(date, -1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(date, 1));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-12">
        <time className="min-w-100">{format(date, "MM월 dd일 (eee)", { locale: ko })}</time>
        <span className="flex gap-4">
          <IconArrowLeftBg className="cursor-pointer" onClick={handlePrevDay} />
          <IconArrowRightBg className="cursor-pointer" onClick={handleNextDay} />
        </span>
        <CalendarPopover onDateSelect={handleDateSelect} />
      </div>
      <TextButton icon="plus">새로운 목록 추가하기</TextButton>
    </div>
  );
}
