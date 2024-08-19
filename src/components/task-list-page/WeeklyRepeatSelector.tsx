import classNames from "classnames";

type WeekdaySelectProps = {
  selectedDays: number[];
  onChange: (days: number[]) => void;
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function WeeklyRepeatSelector({ selectedDays, onChange }: WeekdaySelectProps) {
  const handleDayToggle = (index: number) => {
    const updatedDays = selectedDays.includes(index)
      ? selectedDays.filter((d) => d !== index)
      : [...selectedDays, index];
    onChange(updatedDays.sort((a, b) => a - b));
  };

  return (
    <ul className="flex gap-5">
      {WEEKDAYS.map((day, index) => {
        const buttonClassName = classNames("w-44 h-48 text-14 px-10 py-8 rounded-12 font-medium", {
          "bg-brand-primary text-text-inverse": selectedDays.includes(index),
          "bg-[#2e3135] text-text-default hover:bg-brand-primary hover:text-text-inverse":
            !selectedDays.includes(index),
        });

        return (
          <li key={day}>
            <button
              type="button"
              onClick={() => handleDayToggle(index)}
              className={buttonClassName}
            >
              {day}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
