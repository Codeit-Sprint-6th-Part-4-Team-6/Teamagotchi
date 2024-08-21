import { User } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { useUpdateForm } from "@hooks/useUpdateForm";
import { useAuthStore } from "@store/useAuthStore";
import { patchUser } from "@api/userApi";

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

export default function EditUserForm() {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]) || defaultUserInfo;

  const {
    imageFile,
    changedName,
    errorMessage,
    handleFileChange,
    handleNameChange,
    handleSubmit,
    isPending,
  } = useUpdateForm({
    initialName: user.nickname,
    initialImage: user.image,
    onSubmit: ({ nickname, image }) => patchUser({ nickname, image }),
    successMessage: "계정 설정 변경에 성공하셨습니다.",
    query: "user",
    nameKey: "nickname", // 사용자 닉네임 필드명 설정
  });

  const handleUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event);

    const updatedData: User = {
      ...user,
      nickname: changedName ?? "",
      image: imageFile instanceof File ? user.image : imageFile,
    };
    setUser(updatedData);
  };

  return (
    <form className="flex flex-col gap-24" onSubmit={handleUserSubmit}>
      <div className="absolute right-0 top-24 lg:top-40">
        <Button type="submit" size="small" isPending={isPending}>
          변경하기
        </Button>
      </div>
      <ImageInput
        id="profile-image"
        type="my-profile"
        onChange={handleFileChange}
        defaultValue={imageFile as string}
      />
      <div>
        <Label content="이메일" marginBottom={12} />
        <Input value={user?.email} disabled />
      </div>
      <div>
        <Label htmlFor="nickname" content="이름" marginBottom={12} />
        <Input
          id="nickname"
          name="nickname"
          placeholder={user.nickname}
          errorMessage={errorMessage}
          onChange={handleNameChange}
        />
      </div>
    </form>
  );
}
