import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import CircleProgressBar from "@components/TeamDetailPage/CircleProgressBar";
import { getGroup } from "@api/groupApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { teamId } = context.query;
  const token = context.req.cookies["accessToken"];
  // teamId가 유효한 숫자인지 확인
  if (typeof teamId === "string") {
    try {
      await queryClient.fetchQuery({
        queryKey: ["groups", teamId],
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
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["groups", teamId],
    queryFn: () => getGroup(Number(teamId)),
    staleTime: Infinity,
  });

  if (isError) return <div>Error!</div>;

  if (isLoading) return <div>Loading!</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>태스크와 리포트, 팀원이 보이는 페이지
      <CircleProgressBar className="w-20" strokeWidth={30} progress={80} />
      <CircleProgressBar
        className="w-200"
        strokeWidth={35}
        progress={30}
        transitionDuration={1.25}
        isGradientCircle
      />
      </div>
    </HydrationBoundary>
  );
}
