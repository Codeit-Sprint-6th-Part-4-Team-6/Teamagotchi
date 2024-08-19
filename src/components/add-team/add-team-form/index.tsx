import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { useUploadForm } from "@hooks/useUpdateForm";
import { postGroup } from "@api/groupApi";

export default function AddTeamForm() {
  const {
    changedName,
    errorMessage,
    handleFileChange,
    handleNameChange: handleTeamNameChange,
    handleSubmit,
    isPending,
  } = useUploadForm({
    initialName: "",
    onSubmit: ({ name, image }) => postGroup({ name, image }),
    successMessage: "팀이 성공적으로 생성되었습니다.",
    redirectPath: "/teams",
  });

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
        value={changedName}
        id="team-name"
        type="text"
        placeholder="팀 이름을 입력해주세요"
        errorMessage={errorMessage}
        onChange={handleTeamNameChange}
      />
      <Button
        className="mt-40"
        disabled={changedName.length < 1}
        type="submit"
        isPending={isPending}
      >
        생성하기
      </Button>
    </form>
  );
}
