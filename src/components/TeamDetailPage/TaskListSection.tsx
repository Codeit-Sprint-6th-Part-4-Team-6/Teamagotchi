import TextButton from "@components/commons/Button/TextButton";
import Label from "@components/commons/Label";
import TaskListItem from "./TaskListItem";
import { ITaskList } from "./TaskTypes";

export default function TaskListSection({
  taskLists = [],
  role,
}: {
  taskLists: ITaskList[];
  role: string;
}) {
  return (
    <section>
      <div className="mb-20 flex justify-between">
        <div className="flex items-center gap-5">
          <Label content="할 일 목록" />
          <span className="text-lg font-normal text-text-default">{`(${taskLists.length}개)`}</span>
        </div>
        {role === "ADMIN" ? <TextButton icon="plus">새로운 목록 추가하기</TextButton> : null}
      </div>
      <div className="mb-20 flex flex-col gap-16">
        {taskLists.map((taskList, index) => (
          <TaskListItem key={taskList.id} task={taskList} index={index} role={role} />
        ))}
      </div>
    </section>
  );
}
