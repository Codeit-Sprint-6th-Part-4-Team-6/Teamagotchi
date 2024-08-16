import AddTeamForm from "@components/add-team/add-team-form";
import UpdateTeam from "@components/commons/UpdateTeam";

export default function AddTeamPage() {
  return (
    <UpdateTeam title="팀 참여하기">
      <AddTeamForm />
      <span className="mt-24 text-center text-14 md:text-16">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </span>
    </UpdateTeam>
  );
}
