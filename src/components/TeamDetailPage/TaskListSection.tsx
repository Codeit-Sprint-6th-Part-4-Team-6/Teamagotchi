import { GroupTaskLists } from "@coworkers-types";
import { format } from "date-fns";
import { useRouter } from "next/router";
import TextButton from "@components/commons/Button/TextButton";
import Label from "@components/commons/Label";
import AddOrEditTaskListModal from "@components/commons/modal/AddOrEditTaskListModal";
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
  const router = useRouter();
  const { teamId } = router.query;

  // TaskListItem이 클릭되었을 때 실행할 함수
  const handleTaskListClick = (taskListId: number) => {
    const todayDate = format(new Date(), "yyyy-MM-dd"); // 오늘 날짜 형식
    router.push(`/teams/${teamId}/task-lists/${taskListId}?date=${todayDate}`);
  };

  const handleOpenOneInputModal = () => {
    openModal("AddTaskListModal", AddOrEditTaskListModal);
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
            <TaskListItem
              key={taskList.id}
              task={taskList}
              index={index}
              role={role}
              onClick={() => handleTaskListClick(taskList.id)} // onClick 함수 전달
            />
          ))
        ) : (
          <p className="my-30 text-center text-md text-text-default">아직 할 일 목록이 없습니다</p>
        )}
      </div>
    </section>
  );
}
