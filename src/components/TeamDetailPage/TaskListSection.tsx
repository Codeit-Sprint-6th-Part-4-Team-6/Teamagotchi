import { useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
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
  const [taskListState, setTaskListState] = useState(taskLists);

  // TaskListItem이 클릭되었을 때 실행할 함수
  const handleTaskListClick = (taskListId: number) => {
    const todayDate = format(new Date(), "yyyy-MM-dd"); // 오늘 날짜 형식
    router.push(`/teams/${teamId}/task-lists/${taskListId}?date=${todayDate}`);
  };

  const handleOpenOneInputModal = () => {
    openModal("AddTaskListModal", AddOrEditTaskListModal);
  };

  const handleDragEnd = ({ source, destination }: DropResult) => {
    console.log(source); // 드래그 후  결과값을 볼 수 있다.
    console.log(destination);

    if (!destination) return; // destination는 드래그 후 결과값, result.source는 드래그 전 이전값이 담겨있다.
    const originData = [...taskListState];
    const [reorderedData] = originData.splice(source.index, 1); // 기존 데이터에서 바뀐 부분 제거 후 그 부분 저장
    originData.splice(destination.index, 0, reorderedData); // 기존 데이터의 바뀐 부분에 저장된 것 끼워넣기

    setTaskListState(originData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
        <Droppable droppableId="taskList">
          {(droppableProvided) => (
            <div
              className="mb-4 flex flex-col"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {taskLists.length > 0 ? (
                taskListState.map((taskList, index) => (
                  <Draggable key={taskList.id} draggableId={String(taskList.id)} index={index}>
                    {(draggableProvided, snapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className="mb-16"
                      >
                        <TaskListItem
                          task={taskList}
                          index={index}
                          role={role}
                          onClick={() => handleTaskListClick(taskList.id)} // onClick 함수 전달
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="my-30 text-center text-md text-text-default">
                  아직 할 일 목록이 없습니다
                </p>
              )}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
    </DragDropContext>
  );
}
