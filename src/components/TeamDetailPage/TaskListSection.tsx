import { GroupTaskLists } from "@coworkers-types";
import TextButton from "@components/commons/Button/TextButton";
import Label from "@components/commons/Label";
import AddTaskListModal from "@components/commons/modal/AddTaskListModal";
import { useModal } from "@hooks/useModal";
import TaskListItem from "./TaskListItem";

export default function TaskListSection({
  taskLists = [],
  role,
}: {
  taskLists: GroupTaskLists[];
  role: string;
}) {
  const { openModal } = useModal();
  const handleOpenOneInputModal = () => {
    openModal("OneInputModal", AddTaskListModal);
  };

  return (
    <section>
      <div className="mb-20 flex justify-between">
        <div className="flex items-center gap-5">
          <Label content="할 일 목록" />
          <span className="text-lg font-normal text-text-default">{`(${taskLists.length}개)`}</span>
        </div>
        {role === "ADMIN" && (
          <TextButton icon="plus" onClick={handleOpenOneInputModal}>
            새로운 목록 추가하기
          </TextButton>
        )}
      </div>
      <div className="mb-20 flex flex-col gap-16">
        {taskLists.length > 0 ? (
          taskLists.map((taskList, index) => (
            <TaskListItem key={taskList.id} task={taskList} index={index} role={role} />
          ))
        ) : (
          <p className="my-30 text-center text-md text-text-default">아직 할 일 목록이 없습니다</p>
        )}
      </div>
    </section>
  );
}
