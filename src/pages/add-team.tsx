import AddTeamForm from "@components/add-team/add-team-form";

export default function AddTeamPage() {
  return (
    <div className="m-auto flex w-343 flex-col items-center justify-center pt-100 md:w-460">
      <h1 className="pb-24 text-24 font-medium text-text-primary md:pb-80">팀 생성하기</h1>
      <AddTeamForm />
      <span className="mt-24 text-center text-14 md:text-16">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </span>
    </div>
  );
}