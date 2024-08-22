import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import MembersSection from "@components/TeamDetailPage/MembersSection";
import ReportSection from "@components/TeamDetailPage/ReportSection";
import TaskListSection from "@components/TeamDetailPage/TaskListSection";
import TeamTitle from "@components/TeamDetailPage/TeamTitle";
import Loading from "@components/commons/LottieAnimation/Loading";
import { getGroup } from "@api/groupApi";
import { getUserMemberships } from "@api/userApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { teamId } = context.query;
  const token = context.req.cookies["accessToken"];

  if (typeof teamId === "string") {
    try {
      await queryClient.fetchQuery({
        queryKey: ["team", teamId],
        queryFn: () => getGroup(Number(teamId), token),
        staleTime: Infinity,
      });
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function TeamDetailPage() {
  const router = useRouter();
  const { teamId } = router.query;
  const {
    data: groupData,
    isLoading: groupLoading,
    isError: groupError,
  } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getGroup(Number(teamId)),
    staleTime: Infinity,
  });

  // 내가 속한 팀들의 내 역할을 확인하기 위한 API
  // 굳이 SSR로 안받아도 될 것 같아서 클라이언트에서 응답 받음
  const {
    data: membershipData,
    isLoading: membershipLoading,
    isError: membershipError,
  } = useQuery({
    queryKey: ["userMemberships"],
    queryFn: getUserMemberships,
    staleTime: Infinity,
  });

  if (groupError || membershipError)
    return (
      <div className="m-auto flex justify-center px-16 py-24 md:px-24 lg:w-1200">
        <h1 className="text-xl font-bold text-text-default">정보를 불러오는 데 실패했습니다.</h1>
      </div>
    );

  if (groupLoading || membershipLoading) return <Loading />;

  // 현재 페이지의 내 역할 정보를 정제
  const curTeamMembership = Array.isArray(membershipData)
    ? membershipData.find((group) => group.groupId === groupData?.id)
    : undefined;

  // ReportSection을 위한 데이터 정제
  // taskLists 배열에서 모든 작업을 평탄화
  const totalTask = groupData?.taskLists.flatMap((taskList) => taskList.tasks) || [];
  // 완료된 작업을 필터링
  const completedTasks = totalTask.filter((task) => task.doneAt !== null);
  // 완료율 계산
  const completionRate =
    totalTask.length > 0 ? (completedTasks.length / totalTask.length) * 100 : 0;

  return (
    <div className="mx-auto mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
      <section className="mb-30">
        <TeamTitle
          teamName={groupData?.name ?? ""}
          teamId={groupData?.id ?? 0}
          role={curTeamMembership?.role ?? ""}
        />
      </section>
      <TaskListSection
        taskLists={groupData?.taskLists ?? []}
        role={curTeamMembership?.role ?? ""}
      />
      <ReportSection
        completionRate={completionRate}
        totalTasks={totalTask?.length ?? 0}
        completedTasks={completedTasks?.length ?? 0}
      />
      <MembersSection members={groupData?.members ?? []} role={curTeamMembership?.role ?? ""} />
    </div>
  );
}
