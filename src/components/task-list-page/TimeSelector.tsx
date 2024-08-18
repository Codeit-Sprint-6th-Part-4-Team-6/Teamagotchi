import React, { useMemo, useState } from "react";
import classNames from "classnames";

type TimeProps = {
  selectedTime: string;
  onTimeChange: (time: string) => void;
};

export default function TimeSelector({ selectedTime, onTimeChange }: TimeProps) {
  const [period, setPeriod] = useState(selectedTime.slice(0, 2));
  const [time, setTime] = useState(selectedTime.slice(3));

  const generateTimeOptions = useMemo(() => {
    const options = ["12:00", "12:30"];
    for (let hour = 1; hour < 12; hour += 1) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(1, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  }, []);

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    onTimeChange(`${newPeriod} ${time}`);
  };

  const handleTimeChange = (chooseTime: string) => {
    setTime(chooseTime);
    onTimeChange(`${period} ${chooseTime}`);
  };

  return (
    <div className="flex gap-14 p-12">
      <div className="flex flex-col gap-8">
        <button
          type="button"
          value="AM"
          className={classNames("h-40 w-78 rounded-12 px-10 py-8", {
            "bg-brand-primary text-text-inverse": period === "AM",
            "bg-[#2e3135] text-text-default": period !== "AM",
          })}
          onClick={() => handlePeriodChange("AM")}
        >
          오전
        </button>
        <button
          type="button"
          value="PM"
          className={classNames("h-40 w-78 rounded-12 px-10 py-8", {
            "bg-brand-primary text-text-inverse": period === "PM",
            "bg-[#2e3135] text-text-default": period !== "PM",
          })}
          onClick={() => handlePeriodChange("PM")}
        >
          오후
        </button>
      </div>
      <div className="h-152 w-220 overflow-scroll rounded-12 bg-[#2e3135] px-16 py-8">
        <div className="">
          {generateTimeOptions.map((generatedTime) => (
            <option
              key={generatedTime}
              className={classNames("m-8 cursor-pointer", {
                "text-brand-primary": generatedTime === time,
                "text-text-default": generatedTime !== time,
              })}
              onClick={() => handleTimeChange(generatedTime)}
            >
              {generatedTime}
            </option>
          ))}
        </div>
      </div>
    </div>
  );
}
