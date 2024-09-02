import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Loading from "@components/commons/LottieAnimation/Loading";
import MembersSection from "@components/teamDetailPage/MembersSection";
import ReportSection from "@components/teamDetailPage/ReportSection";
import TaskListSection from "@components/teamDetailPage/TaskListSection";
import TeamTitle from "@components/teamDetailPage/TeamTitle";
import { getGroup } from "@api/groupApi";
import { getUserMemberships } from "@api/userApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { teamId } = context.query;
  const token = context.req.cookies["accessToken"];

  if (typeof teamId === "string") {
    try {
      await queryClient.fetchQuery({
        queryKey: ["group", teamId],
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
    queryKey: ["group", teamId],
    queryFn: () => getGroup(Number(teamId)),
    staleTime: Infinity,
  });

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

  const curTeamMembershipInfo = Array.isArray(membershipData)
    ? membershipData.find((group) => group.groupId === groupData?.id)
    : undefined;

  const totalTask = groupData?.taskLists.flatMap((taskList) => taskList.tasks) || [];
  const completedTasks = totalTask.filter((task) => task.doneAt !== null);
  const completionRate =
    totalTask.length > 0 ? (completedTasks.length / totalTask.length) * 100 : 0;

  return (
    <div className="mx-auto mt-20 w-full min-w-255 max-w-1200 px-34 py-20 xs:px-17 lg:px-0">
      <section className="mb-30">
        <TeamTitle
          teamName={groupData?.name ?? ""}
          teamId={groupData?.id ?? 0}
          role={curTeamMembershipInfo?.role ?? ""}
          profile={groupData?.image ?? ""}
        />
      </section>
      <ReportSection
        completionRate={completionRate}
        totalTasks={totalTask?.length ?? 0}
        completedTasks={completedTasks?.length ?? 0}
      />
      <TaskListSection
        taskLists={groupData?.taskLists ?? []}
        role={curTeamMembershipInfo?.role ?? ""}
      />

      <MembersSection members={groupData?.members ?? []} role={curTeamMembershipInfo?.role ?? ""} />
    </div>
  );
}
