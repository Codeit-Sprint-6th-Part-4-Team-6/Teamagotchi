import Date from "@components/taskListPage/Date";
import TaskList from "@components/taskListPage/TaskList";

export default function TaskListPage() {
  return (
    <div className="m-auto px-16 py-24 md:px-24 lg:w-1200">
      <h1 className="mb-30 text-18 font-bold md:mb-27 md:text-20">할 일</h1>
      <Date />
      <TaskList />
    </div>
  );
}
