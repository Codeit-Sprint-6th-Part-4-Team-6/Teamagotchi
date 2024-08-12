import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getGroup } from "@api/groupApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { teamId } = context.query;

  console.log("Server-side teamId:", teamId);

  // teamId가 유효한 숫자인지 확인
  if (typeof teamId === "string") {
    try {
      await queryClient.fetchQuery({
        queryKey: ["userGroups", teamId],
        queryFn: () => getGroup(teamId),
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

  console.log("Client-side teamId:", teamId);

  const { data: groupData, error } = useQuery({
    queryKey: ["userGroups", teamId],
    queryFn: () => getGroup(teamId as string),
    enabled: !!teamId,
  });

  console.log("Query data:", groupData);
  console.log("Query error:", error);

  if (error) return <div>Error loading data</div>;
  if (!groupData) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>태스크와 리포트, 팀원이 보이는 페이지</div>
    </HydrationBoundary>
  );
}
