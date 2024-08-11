// import { History } from "@coworkers-types";
import { History, TaskDone } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/commons/Spinner";
import TaskHistory from "@components/my-history/TaskHistory";
import { getUserHistory } from "@api/userApi";

export default function MyHistoryPage() {
  const { data: history, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getUserHistory,
    staleTime: Infinity,
  });

  return (
    <div className="px-16 pb-40 pt-24 md:px-24 lg:mx-auto lg:max-w-1200 lg:px-0 lg:pt-40">
      <h1 className="mb-24 text-xl font-bold text-text-primary">마이 히스토리</h1>
      {isLoading || !history ? (
        <Spinner size={36} color="#64748B" />
      ) : (
        history.map((taskList) => <TaskHistory completedTaskList={taskList} key={taskList[0].id} />)
      )}
    </div>
  );
}
