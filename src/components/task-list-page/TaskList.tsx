import { useCallback, useEffect, useState } from "react";
import { Group, GroupTaskLists, TaskList } from "@coworkers-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useRouter } from "next/router";
import Spinner from "@components/commons/Spinner";
import { getGroup } from "@api/groupApi";
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
};

export default function TaskLists({
  taskLists,
  handleTaskListId,
  isLoading,
  isError,
  groupId,
  taskListId,
}: Props) {
  const router = useRouter();
  const { teamId, taskListsId } = router.query;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const queryClient = useQueryClient();

  // 탭의 정보를 받아오기 위해서 사용했는데, 추후에는 팀페이지에서 받은 그룹데이터를 getQueryClient 사용 예정
  const { data: groupData } = useQuery<Group>({
    queryKey: ["group", teamId],
    queryFn: () => getGroup(Number(teamId)),
    enabled: !!teamId,
    staleTime: Infinity,
  });

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
      <div className="mb-16 mt-19 flex gap-12 overflow-auto" role="tablist">
        {groupData?.taskLists.map((taskList, index) => (
          <div
            key={taskList.id}
            className="flex min-w-fit cursor-pointer flex-col gap-5"
            onClick={() => handleActiveTab(index, taskList)}
            role="tab"
            aria-selected={activeTabIndex === index}
            tabIndex={0}
          >
            <span
              className={classNames("text-text-default", {
                "text-text-inverse": activeTabIndex === index,
              })}
            >
              {taskList.name}
            </span>
            {activeTabIndex === index && (
              <span className="w-full border-b-[1.5px] border-solid border-text-inverse" />
            )}
          </div>
        ))}
      </div>
      {isLoading && <Spinner className="mt-200" />}
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
