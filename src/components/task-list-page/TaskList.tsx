import { useEffect, useState } from "react";
import { GroupTaskLists } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useRouter } from "next/router";
import Spinner from "@components/commons/Spinner";
import { getGroup } from "@api/groupApi";
import { getTaskList } from "@api/taskListApi";
import Task from "./Task";

type Props = {
  date: Date;
};

export default function TaskList({ date }: Props) {
  const router = useRouter();
  const { teamId, taskListsId } = router.query;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [taskListId, setTaskListId] = useState(Number(taskListsId));

  // 탭의 정보를 받아오기 위해서 사용했는데, 추후에는 팀페이지에서 받은 데이터 사용 예정
  const {
    data: groupData,
    isLoading: groupLoading,
    error: groupError,
  } = useQuery({
    queryKey: ["groups", teamId],
    queryFn: () => getGroup(Number(teamId)),
    enabled: !!teamId,
  });

  const {
    data: taskLists,
    isLoading: taskListsLoading,
    error: taskListsError,
  } = useQuery({
    queryKey: ["taskLists", taskListId, date.toISOString()],
    queryFn: () => getTaskList(Number(teamId), Number(taskListId), date.toISOString()),
    enabled: !!taskListId,
  });

  useEffect(() => {
    if (groupData && groupData.taskLists) {
      if (taskListsId) {
        const id = Number(taskListsId);
        setTaskListId(id);
        const index = groupData.taskLists.findIndex((taskList) => taskList.id === id);
        if (index !== -1) {
          setActiveTabIndex(index);
        }
      }
    }
  }, [groupData, taskListsId]);

  const handleActiveTab = (index: number, taskList: GroupTaskLists) => {
    setActiveTabIndex(index);
    setTaskListId(taskList.id);
    router.push(`/teams/${teamId}/task-lists/${taskList.id}`, undefined, { shallow: true });
  };

  if (groupLoading || taskListsLoading)
    return (
      <div className="mt-200">
        <Spinner size={20} color="#10B981" />
      </div>
    );

  if (groupError || taskListsError) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <section>
      <div className="mb-16 mt-19 flex gap-12">
        {groupData?.taskLists.map((taskList, index) => (
          <div
            key={taskList.id}
            className="flex cursor-pointer flex-col gap-5"
            onClick={() => handleActiveTab(index, taskList)}
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
      {taskLists?.tasks.map((task) => <Task task={task} />)}
    </section>
  );
}
