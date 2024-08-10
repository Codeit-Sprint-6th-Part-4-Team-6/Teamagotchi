// import { History } from "@coworkers-types";
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
      {isLoading ? (
        <Spinner size={36} color="#64748B" />
      ) : (
        history?.map((taskList) => (
          <TaskHistory completedTaskList={taskList.tasksDone} key={taskList.tasksDone[0].id} />
        ))
      )}
    </div>
  );
}
// const testList: History = [
//   {
//     tasksDone: [
//       {
//         id: 624,
//         updatedAt: "2024-08-10T10:54:58.313Z",
//         date: "2024-08-10T00:00:00.000Z",
//         doneAt: "2024-08-10T10:54:58.312Z",
//         recurringId: 249,
//         name: "테스트1",
//         description: "",
//         frequency: "ONCE",
//         deletedAt: "2024-08-10T10:54:58.312Z",
//         userId: 86,
//         displayIndex: 2,
//       },
//       {
//         id: 622,
//         updatedAt: "2024-08-10T10:54:48.047Z",
//         date: "2024-08-10T00:00:00.000Z",
//         doneAt: "2024-08-10T10:54:48.045Z",
//         recurringId: 247,
//         name: "테스트1",
//         description: "",
//         frequency: "ONCE",
//         deletedAt: "2024-08-10T10:54:58.312Z",
//         userId: 86,
//         displayIndex: 0,
//       },
//       {
//         id: 623,
//         updatedAt: "2024-08-10T10:54:55.477Z",
//         date: "2024-08-10T00:00:00.000Z",
//         doneAt: "2024-08-10T10:54:55.476Z",
//         recurringId: 248,
//         name: "테스트1",
//         description: "",
//         frequency: "ONCE",
//         deletedAt: "2024-08-10T10:54:58.312Z",
//         userId: 86,
//         displayIndex: 1,
//       },
//       {
//         id: 626,
//         updatedAt: "2024-08-10T11:00:22.399Z",
//         date: "2024-08-11T00:00:00.000Z",
//         doneAt: "2024-08-10T11:00:22.398Z",
//         recurringId: 251,
//         name: "테스트1",
//         description: "",
//         frequency: "ONCE",
//         deletedAt: "2024-08-10T10:54:58.312Z",
//         userId: 86,
//         displayIndex: 0,
//       },
//       {
//         id: 627,
//         updatedAt: "2024-08-10T11:00:25.574Z",
//         date: "2024-08-11T00:00:00.000Z",
//         doneAt: "2024-08-10T11:00:25.573Z",
//         recurringId: 252,
//         name: "테스트1",
//         description: "",
//         frequency: "ONCE",
//         deletedAt: "2024-08-10T10:54:58.312Z",
//         userId: 86,
//         displayIndex: 1,
//       },
//     ],
//   },
//   {
//     tasksDone: [
//       {
//         id: 628,
//         updatedAt: "2024-08-10T10:54:58.313Z",
//         date: "2024-08-10T00:00:00.000Z",
//         doneAt: "2024-08-09T10:54:58.312Z",
//         recurringId: 249,
//         name: "테스트1",
//         description: "",
//         frequency: "ONCE",
//         deletedAt: "2024-08-10T10:54:58.312Z",
//         userId: 86,
//         displayIndex: 2,
//       },
//       {
//         id: 629,
//         updatedAt: "2024-08-10T10:54:48.047Z",
//         date: "2024-08-10T00:00:00.000Z",
//         doneAt: "2024-08-09T10:54:48.045Z",
//         recurringId: 247,
//         name: "테스트1",
//         description: "",
//         frequency: "ONCE",
//         deletedAt: "2024-08-10T10:54:58.312Z",
//         userId: 86,
//         displayIndex: 0,
//       },
//     ],
//   },
// ];
