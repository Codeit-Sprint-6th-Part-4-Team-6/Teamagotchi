import Head from "next/head";
import AddTeamForm from "@components/add-team/add-team-form";
import UpdateTeam from "@components/commons/UpdateTeam";

export default function AddTeamPage() {
  return (
    <Head>
      <title>티마고치 | 팀 생성하기</title>
      <meta name="description" content="새로운 팀을 만들어보세요!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <UpdateTeam title="팀 생성하기">
      <AddTeamForm />
      <span className="mt-24 text-center text-14 md:text-16">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </span>
    </UpdateTeam>
  );
}
