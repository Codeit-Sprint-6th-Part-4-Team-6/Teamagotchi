import { useCallback, useEffect, useState } from "react";
import { Group, GroupTaskLists, TaskList } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { getTaskDetails } from "@api/taskApi";
import { getTaskComments } from "@api/taskCommentApi";
import Sidebar from "./Sidebar";
import Task from "./Task";

type Props = {
  taskLists: TaskList | undefined;
  handleTaskListId: (id: string | string[] | undefined) => void;
  isLoading: boolean;
  isError: Error | null;
  groupId: string;
  taskListId: string;
  groupData: Group | undefined;
};

export default function TaskLists({
  taskLists,
  handleTaskListId,
  isLoading,
  isError,
  groupId,
  taskListId,
  groupData,
}: Props) {
  const router = useRouter();
  const { teamId, taskListsId } = router.query;
  const queryClient = useQueryClient();

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    if (groupData && groupData.taskLists) {
      if (taskListsId) {
        const id = taskListsId;
        handleTaskListId(id);
        const index = groupData.taskLists.findIndex((taskList) => taskList.id.toString() === id);
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
    (index: number, taskList: GroupTaskLists) => {
      setActiveTabIndex(index);
      handleTaskListId(taskList.id.toString());
      router.push(`/teams/${teamId}/task-lists/${taskList.id}`, undefined, { shallow: true });
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

  if (isError) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <section>
      <div className="no-scroll mb-16 mt-19 flex gap-12 overflow-auto" role="tablist">
        {groupData?.taskLists.map((taskList, index) => (
          <motion.div
            key={taskList.id}
            className="flex min-w-fit cursor-pointer flex-col gap-5"
            onClick={() => handleActiveTab(index, taskList)}
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
              {taskList.name}
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
        <div>
          {taskLists?.tasks && taskLists.tasks.length > 0 ? (
            taskLists?.tasks.map((task) => (
              <Task key={task.id} task={task} onClick={() => handleTaskClick(task.id)} />
            ))
          ) : (
            <div className="mt-191 flex items-center justify-center text-center text-14 font-medium leading-[17px] text-text-default md:mt-345 lg:mt-310">
              아직 할 일이 없습니다.
              <br /> 할 일을 추가해보세요.
            </div>
          )}
        </div>
      )}
      {isSidebarVisible && selectedTaskId && (
        <Sidebar
          groupId={groupId}
          taskListId={taskListId}
          taskId={selectedTaskId}
          onClose={handleCloseSidebar}
        />
      )}
    </section>
  );
}
