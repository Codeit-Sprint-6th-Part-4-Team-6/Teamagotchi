import { useEffect, useState } from "react";
import { TaskList as TaskListType } from "@coworkers-types";
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Loading from "@components/commons/Loading";
import CreateTaskModal from "@components/task-list-page/CreateTaskModal";
import DateWithCalendar from "@components/task-list-page/DateWithCalendar";
import TaskList from "@components/task-list-page/TaskList";
import { useModal } from "@hooks/useModal";
import { getGroup } from "@api/groupApi";
import { getTaskList } from "@api/taskListApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { query } = context;
  const { teamId, taskListsId } = query;
  const token = context.req.cookies["accessToken"];
  const date = query.date ?? new Date().toISOString().slice(0, 10);

  try {
    await queryClient.fetchQuery({
      queryKey: ["taskLists", Number(taskListsId), date],
      queryFn: () => getTaskList(teamId, taskListsId, date as string, token as string),
      staleTime: Infinity,
    });
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function TaskListPage({ dehydratedState }: { dehydratedState: DehydratedState }) {
  const { openModal } = useModal();
  const handleOpenCreateTaskModal = () => {
    openModal("CreateTaskModal", CreateTaskModal, {});
  };

  const router = useRouter();
  const { teamId, taskListsId, date: urlDate } = router.query;
  const [selectedDate, setSelectedDate] = useState<Date>(
    urlDate && typeof urlDate === "string" ? new Date(urlDate) : new Date()
  );
  const [taskListId, setTaskListId] = useState(taskListsId);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    updateURL(date, taskListId);
  };

  const handleTaskListId = (id: string | string[] | undefined) => {
    setTaskListId(id);
    updateURL(selectedDate, id);
  };

  useEffect(() => {
    if (urlDate && typeof urlDate === "string") {
      setSelectedDate(new Date(urlDate));
    }
  }, [urlDate]);

  const updateURL = (date: Date, id: string | string[] | undefined) => {
    const path = `/teams/${teamId}/task-lists/${id}`;
    const query = { date: date.toISOString().slice(0, 10) };

    router.push(
      {
        pathname: path,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const {
    data,
    isLoading: taskListsLoading,
    error: taskListsError,
  } = useQuery<TaskListType>({
    queryKey: ["taskLists", Number(taskListsId), selectedDate.toISOString().slice(0, 10)],
    queryFn: () => getTaskList(teamId, taskListsId, selectedDate.toISOString()),
    placeholderData: keepPreviousData,
    enabled: !!taskListId,
  });

  const { data: groupData, isLoading: groupDataLoading } = useQuery({
    queryKey: ["group", teamId],
    queryFn: () => getGroup(Number(teamId)),
    enabled: !!teamId,
  });

  if (groupDataLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>
          티마고치 | {groupData?.name} - {data?.name}
        </title>
        <meta
          name="description"
          content={`${groupData?.name} ${data?.name} - 티마고치로 할 일을 스마트하게 관리하고 팀 협업을 즐겨보세요!`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HydrationBoundary state={dehydratedState}>
        <div className="m-auto px-16 py-24 md:px-24 lg:w-1200">
          <h1 className="mb-30 text-18 font-bold md:mb-27 md:text-20">할 일</h1>
          <DateWithCalendar date={selectedDate} onDateChange={handleDateChange} />
          <TaskList
            taskLists={data}
            isLoading={taskListsLoading}
            isError={taskListsError}
            handleTaskListId={handleTaskListId}
            groupId={teamId as string}
            taskListId={taskListId as string}
            groupData={groupData}
          />
        </div>
        <Button
          buttonType="floating"
          icon="plus"
          className="bottom-24 right-24 lg:bottom-48 lg:right-100"
          onClick={handleOpenCreateTaskModal}
        >
          할 일 추가
        </Button>
      </HydrationBoundary>
    </>
  );
}
