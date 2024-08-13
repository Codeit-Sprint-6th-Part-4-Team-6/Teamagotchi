import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import MembersSection from "@components/TeamDetailPage/MembersSection";
// import CircleProgressBar from "@components/TeamDetailPage/CircleProgressBar";
import TeamTitle from "@components/TeamDetailPage/TeamTitle";
import Spinner from "@components/commons/Spinner";
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

export default function TeamDetailPage({ dehydratedState }: { dehydratedState: DehydratedState }) {
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

  if (groupLoading || membershipLoading)
    return (
      <div className="m-auto px-16 py-24 md:px-24 lg:w-1200">
        <section>
          <div className="h-[64px] rounded-12 border border-solid border-border-primary bg-background-secondary">
            <Spinner />
          </div>
        </section>
      </div>
    );

  console.log(groupData);

  // 현재 페이지의 내 역할 정보를 정제
  const curTeamMembership = Array.isArray(membershipData)
    ? membershipData.find((group) => group.groupId === groupData?.id)
    : undefined;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="m-auto px-16 py-24 md:px-24 lg:w-1200">
        <section className="mb-30">
          <TeamTitle
            teamName={groupData?.name ?? ""}
            teamId={groupData?.id ?? 0}
            role={curTeamMembership?.role ?? ""}
          />
        </section>
        <MembersSection members={groupData?.members ?? []} role={curTeamMembership?.role ?? ""} />
        {/* <CircleProgressBar className="w-20" strokeWidth={30} progress={80} />
        <CircleProgressBar
          className="w-200"
          strokeWidth={35}
          progress={30}
          transitionDuration={1.25}
          isGradientCircle
        /> */}
      </div>
    </HydrationBoundary>
  );
}
