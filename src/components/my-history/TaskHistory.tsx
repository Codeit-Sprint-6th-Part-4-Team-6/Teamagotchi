import { TaskDone } from "@coworkers-types";
import { format } from "date-fns";
import Label from "@components/commons/Label";
import { IconCheckboxActive } from "@utils/icon";

type TaskHistoryProps = {
  completedTaskList: TaskDone[];
};

/**
 * 특정 날짜(하루)의 완료된 일들을 받아 렌더링합니다.
 * @prop completedTaskList: TaskDone[];
 */

export default function TaskHistory({ completedTaskList }: TaskHistoryProps) {
  return (
    <div className="mb-40 flex flex-col gap-16">
      <Label content={format(completedTaskList[0].doneAt, "yyyy년 MM월 dd일")} />
      {completedTaskList.map((task) => (
        <CompletedTask task={task} key={task.id} />
      ))}
    </div>
  );
}

/**
 * task 하나의 정보를 받아 렌더링합니다.
 */

export function CompletedTask({ task }: { task: TaskDone }) {
  return (
    <div className="flex items-center gap-7 rounded-[8px] bg-background-secondary px-10 py-14 text-md font-normal text-text-primary line-through">
      <IconCheckboxActive className="flex-shrink-0" />
      {task.name}
    </div>
  );
}
