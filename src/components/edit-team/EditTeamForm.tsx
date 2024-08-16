import { User, UserInfo } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { useUpdateForm } from "@hooks/useUpdateForm";
import { useAuthStore } from "@store/useAuthStore";
import { patchGroupProfile } from "@api/groupApi";

const defaultUserInfo: User = {
  nickname: "",
  image: "",
  createdAt: "",
  updatedAt: "",
  id: 0,
  email: "",
  teamId: "",
  memberships: [],
};

export default function EditTeamForm() {
  const router = useRouter();
  const teamId = Number(router.query.teamId);
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const queryUser = queryClient.getQueryData<User>(["user"]) || defaultUserInfo;
  console.log(teamId);
  const {
    imageFile,
    changedName,
    errorMessage,
    handleFileChange,
    handleNameChange: handleTeamNameChange,
    handleSubmit,
    isPending,
  } = useUpdateForm({
    initialName: "",
    onEditSubmit: (id, profile) =>
      patchGroupProfile(id as number, { name: profile?.name, image: profile?.image }),
    successMessage: "팀이 성공적으로 수정되었습니다.",
    queryKey: "user",
  });

  console.log(queryUser);
  console.log(user);

  const handleGroupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event, teamId);

    // queryUser.memberships.indexOf(groupId, teamId);

    const updatedData = {
      ...queryUser,
      nickname: changedName,
      image: imageFile instanceof File ? queryUser.image : imageFile,
    };
    setUser(updatedData);
  };

  return (
    <form onSubmit={handleGroupSubmit} className="w-full">
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
