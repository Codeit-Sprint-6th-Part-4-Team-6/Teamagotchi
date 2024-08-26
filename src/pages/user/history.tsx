import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/commons/Spinner";
import TaskHistory from "@components/my-history/TaskHistory";
import { getUserHistory } from "@api/userApi";

export default function MyHistoryPage() {
  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["history"],
    queryFn: getUserHistory,
    staleTime: Infinity,
  });
  return (
    <div className="min-h-[70vh] px-16 pb-40 pt-24 md:px-24 lg:mx-auto lg:max-w-1200 lg:px-0 lg:pt-40">
      <h1 className="pb-24 text-18 font-semibold text-text-primary md:text-24">마이 히스토리</h1>
      {isLoading && <Spinner size={36} color="primary" className="!h-[70vh]" />}
      {history && history.length > 0 && !isError
        ? !isLoading &&
          history.map((taskList) => (
            <TaskHistory completedTaskList={taskList} key={taskList[0].id} />
          ))
        : !isLoading && (
            <div className="flex h-[70vh] items-center justify-center text-md font-medium text-text-default">
              아직 히스토리가 없습니다.
            </div>
          )}
    </div>
  );
}
