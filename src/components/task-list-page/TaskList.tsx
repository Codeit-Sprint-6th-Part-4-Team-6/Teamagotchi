import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Group, GroupTaskLists, TaskList as TaskListType } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useTaskListPageDnd from "@hooks/useTaskListPageDnd";
import { getTaskDetails } from "@api/taskApi";
import { getTaskComments } from "@api/taskCommentApi";
import Task from "./Task";
import Sidebar from "./sidebar";

type Props = {
  taskList: TaskListType | undefined;
  handleTaskListId: (id: string | string[] | undefined) => void;
  isLoading: boolean;
  isError: Error | null;
  groupId: string;
  taskListId: string;
  groupData: Group | undefined;
};

export default function TaskList({
  taskList,
  handleTaskListId,
  isLoading,
  isError,
  groupId,
  taskListId,
  groupData,
}: Props) {
  const router = useRouter();
  const { teamId, taskListsId, date: urlDate } = router.query;
  const queryClient = useQueryClient();
  const { handleDragEnd } = useTaskListPageDnd(teamId, taskListsId, urlDate);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [checkedTaskIds, setCheckedTaskIds] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (groupData && groupData.taskLists) {
      if (taskListsId) {
        const id = taskListsId;
        handleTaskListId(id);
        const index = groupData.taskLists.findIndex((tasks) => tasks.id.toString() === id);
        if (index !== -1) {
          setActiveTabIndex(index);
        }
      }
    }
  }, [groupData, taskListsId]);

  useEffect(() => {
    groupData?.taskLists.forEach((tasks) => {
      tasks.tasks.forEach((task) => {
        queryClient.prefetchQuery({
          queryKey: ["taskListDetail", task.id],
          queryFn: () => getTaskDetails(Number(groupId), Number(taskListId), task.id),
          staleTime: Infinity,
        });
        queryClient.prefetchQuery({
          queryKey: ["taskComments", task.id],
          queryFn: () => getTaskComments(task.id),
          staleTime: Infinity,
        });
      });
    });
  });

  const handleActiveTab = useCallback(
    (index: number, tasks: GroupTaskLists) => {
      setActiveTabIndex(index);
      handleTaskListId(tasks.id.toString());
      router.push(`/teams/${teamId}/task-lists/${tasks.id}`, undefined, { shallow: true });
    },
    [teamId]
  );

  const handleTaskClick = useCallback((taskId: number) => {
    setSelectedTaskId(taskId);
    setIsSidebarVisible(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarVisible(false);
    setSelectedTaskId(null);
  }, []);

  const handleCheckTask = (taskId: number, isChecked: boolean) => {
    setCheckedTaskIds((prev) => ({
      ...prev,
      [taskId]: isChecked,
    }));
  };

  if (isError) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <section>
      <div className="no-scroll mb-16 mt-19 flex gap-12 overflow-auto" role="tablist">
        {groupData?.taskLists.map((tasks, index) => (
          <motion.div
            key={tasks.id}
            className="flex min-w-fit cursor-pointer flex-col gap-5"
            onClick={() => handleActiveTab(index, tasks)}
            role="tab"
            aria-selected={activeTabIndex === index}
            tabIndex={0}
            whileHover={activeTabIndex !== index ? { scale: 0.96 } : {}}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className={classNames({
                "text-text-default": activeTabIndex !== index,
                "text-text-inverse": activeTabIndex === index,
              })}
              animate={{
                color: activeTabIndex === index ? "#fff" : "#c3c7cc",
              }}
              whileHover={activeTabIndex !== index ? { color: "#fff" } : {}}
              transition={{ duration: 0.2 }}
            >
              {tasks.name}
            </motion.span>
            <motion.span
              className="w-full border-b-[1.5px] border-solid"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: activeTabIndex === index ? 1 : 0,
                borderColor: activeTabIndex === index ? "#ffffff" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
      {!isLoading && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskList">
            {(droppableProvided) => (
              <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                {taskList?.tasks && taskList.tasks.length > 0 ? (
                  taskList?.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(draggableProvided, snapshot) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          className="mb-16"
                        >
                          <Task
                            key={task.id}
                            task={task}
                            isChecked={checkedTaskIds[task.id] ?? false}
                            onCheckTask={handleCheckTask}
                            onClick={() => handleTaskClick(task.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="mt-191 flex items-center justify-center text-center text-14 font-medium leading-[17px] text-text-default md:mt-345 lg:mt-310">
                    아직 할 일이 없습니다.
                    <br /> 할 일을 추가해보세요.
                  </div>
                )}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {isSidebarVisible && selectedTaskId && (
        <Sidebar
          groupId={groupId}
          taskListId={taskListId}
          taskId={selectedTaskId}
          isChecked={checkedTaskIds[selectedTaskId] ?? false}
          onCheckTask={handleCheckTask}
          onClose={handleCloseSidebar}
        />
      )}
    </section>
  );
}
