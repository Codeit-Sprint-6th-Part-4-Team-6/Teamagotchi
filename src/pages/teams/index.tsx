import Head from "next/head";
import Link from "next/link";
import Button from "@components/commons/Button";
import TeamList from "@components/teams/TeamList";

export default function TeamsPage() {
  return (
    <>
      <Head>
        <title>티마고치 | 팀 리스트</title>
        <meta
          name="description"
          content="다양한 재능이 모이는 곳, 티마고치 팀 리스트 페이지입니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="flex flex-col items-center">
        <TeamList />

        <Button size="medium" className="mt-48 md:mt-80">
          <Link href="/add-team" className="h-full w-full leading-[48px]">
            팀 생성하기
          </Link>
        </Button>
        <Button buttonStyle="transparent" size="medium" className="mt-8 lg:mt-16">
          <Link href="/join-team" className="h-full w-full leading-[48px]">
            팀 참여하기
          </Link>
        </Button>
      </section>
    </>
  );
}
