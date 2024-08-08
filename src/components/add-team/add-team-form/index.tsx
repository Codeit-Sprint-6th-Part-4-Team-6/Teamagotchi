import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { useAddTeamForm } from "@hooks/useAddTeamForm";

export default function AddTeamForm() {
  const {
    teamName,
    nameErrorMessage,
    handleFileChange,
    handleTeamNameChange,
    handleSubmit,
    isPending,
  } = useAddTeamForm();

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Label type="label" content="팀 프로필" htmlFor="team-profile" marginBottom={12} />
      <ImageInput
        id="image-file"
        type="team-profile"
        onChange={handleFileChange}
        className="mb-24"
      />
      <Label type="label" content="팀 이름" htmlFor="team-name" marginBottom={12} />
      <Input
        value={teamName}
        id="team-name"
        type="text"
        placeholder="팀 이름을 입력해주세요"
        errorMessage={nameErrorMessage}
        onChange={handleTeamNameChange}
      />
      <Button className="mt-40" disabled={teamName.length < 1} type="submit" isPending={isPending}>
        생성하기
      </Button>
    </form>
  );
}
