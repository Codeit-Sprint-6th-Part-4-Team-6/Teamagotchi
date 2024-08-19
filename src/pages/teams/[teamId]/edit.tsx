import UpdateTeam from "@components/commons/UpdateTeam";
import EditTeamForm from "@components/edit-team/EditTeamForm";

export default function EditTeamPage() {
  return (
    <UpdateTeam title="팀 수정하기">
      <EditTeamForm />
    </UpdateTeam>
  );
}
