import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Button from "@components/commons/Button";
import ErrorBoundary from "@components/commons/ErrorBoundary";
import Label from "@components/commons/Label";
import Spinner from "@components/commons/Spinner";
import TeamList from "@components/teams/TeamList";

const getAdvice = async () => {
  const response = await axios.get("https://korean-advice-open-api.vercel.app/api/advice");
  return response.data;
};

export default function TeamsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["advice"],
    queryFn: getAdvice,
    staleTime: Infinity,
  });

  return (
    <div className="m-auto mb-60 w-full p-20 md:w-600 md:pt-40 lg:w-900">
      <Head>
        <title>티마고치 | 팀 리스트</title>
        <meta
          name="description"
          content="다양한 재능이 모이는 곳, 티마고치 팀 리스트 페이지입니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Label content="오늘의 명언 🧀" className="mb-10" />
      <section className="mb-30 flex flex-col items-center gap-20 rounded-8 bg-[url('https://t3.ftcdn.net/jpg/02/31/29/72/360_F_231297252_HAx1Lp9MDYKgaQB6rF37SYDdtARu8EwG.jpg')] bg-cover bg-bottom bg-right md:flex-row">
        <div className="flex w-full flex-col justify-center gap-20 rounded-8 bg-text-tertiary/10 p-10 backdrop-blur-sm md:h-150 md:p-20">
          {isLoading ? (
            <Spinner />
          ) : (
            <ErrorBoundary queryKey={{ queryKey: ["advice"] }}>
              <>
                <span className="flex flex-col gap-10">
                  <span className="text-14 md:text-16">{data?.author}</span>
                  <span className="text-italic text-12 md:text-14">{data?.authorProfile}</span>
                </span>
                <span className="text-12 italic md:text-14">{data?.message}</span>
              </>
            </ErrorBoundary>
          )}
        </div>
      </section>

      <Label content="내가 속한 팀 리스트 ✨" className="mb-10" />
      <TeamList />
      <div className="m-auto mt-60 flex gap-10 lg:mt-80 lg:w-400">
        <Button>
          <Link href="/add-team">팀 생성하기</Link>
        </Button>
        <Button buttonStyle="transparent">
          <Link href="/join-team">팀 참여하기</Link>
        </Button>
      </div>
    </div>
  );
}
