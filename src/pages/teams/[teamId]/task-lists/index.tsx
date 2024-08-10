import { useState } from "react";
import DateWithCalendar from "@components/task-list-page/DateWithCalendar";
import TaskList from "@components/task-list-page/TaskList";

export default function TaskListPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="m-auto px-16 py-24 md:px-24 lg:w-1200">
      <h1 className="mb-30 text-18 font-bold md:mb-27 md:text-20">할 일</h1>
      <DateWithCalendar date={selectedDate} onDateChange={handleDateChange} />
      <TaskList date={selectedDate} />
    </div>
  );
}
