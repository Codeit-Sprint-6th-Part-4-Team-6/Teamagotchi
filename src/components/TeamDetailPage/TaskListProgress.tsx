import { DateTask } from "@coworkers-types";
import { IconDone } from "@utils/icon";
import CircleProgressBar from "./CircleProgressBar";

export default function TaskListProgress({ tasks }: { tasks: DateTask[] }) {
  const completedTasks = tasks.filter((task) => task.doneAt).length;
  const totalTasks = tasks.length;

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="flex items-center gap-4 rounded-full bg-background-primary px-8 py-4">
      {progress === 100 ? (
        <IconDone />
      ) : (
        <CircleProgressBar className="mt-1 w-12" strokeWidth={30} progress={progress} />
      )}
      <p className="text-[#ffc078]">{`${completedTasks}/${totalTasks}`}</p>
    </div>
  );
}
