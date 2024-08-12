import { useState } from "react";
import { UserInfo } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import { postImageURL } from "@api/imageApi";
import { patchUser } from "@api/userApi";

const defaultUserInfo: UserInfo = {
  nickname: "",
  image: "",
  createdAt: "",
  updatedAt: "",
  id: 0,
  email: "",
  teamId: "",
};

export default function EditUserForm() {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserInfo>(["user"]) || defaultUserInfo;
  const user: UserInfo = userData;
  const [profileImage, setProfileImage] = useState<string | File | null>(user?.image ?? null);
  const [name, setName] = useState(user?.nickname ?? "");
  const [errorMessage, setErrorMessage] = useState("");

  const { toast } = useToast();

  const handleFileChange = (value: string | File | null) => {
    setProfileImage(value);
  };

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const patchUserMutation = useMutation({
    mutationFn: ({ nickname, image }: { nickname?: string; image?: string }) =>
      patchUser({ nickname, image }),
    onSuccess: () => {
      const updatedData = {
        ...user,
        nickname: name,
        image: profileImage instanceof File ? user.image : profileImage,
      };
      setUser(updatedData);
      queryClient.setQueryData(["user"], updatedData);
      toast("success", "계정 설정 변경에 성공하셨습니다.");
    },
    onError: (error: any) => {
      const message = error.response.data?.message;
      setErrorMessage(message);
    },
  });

  const imagePostMutation = useMutation({
    mutationFn: (file: File) => postImageURL(file),
    onSuccess: (data: { url: string }) => {
      patchUserMutation.mutate({ nickname: name, image: data.url });
    },
    onError: (error: any) => {
      alert(`Error uploading image: ${error}`);
    },
  });

  const isPending = patchUserMutation.isPending || imagePostMutation.isPending;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) return;

    if (profileImage instanceof File) {
      imagePostMutation.mutate(profileImage);
    } else {
      patchUserMutation.mutate({ nickname: name });
    }

    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <form className="flex flex-col gap-24" onSubmit={handleSubmit}>
      <div className="absolute right-0 top-24 lg:top-40">
        <Button type="submit" size="small" isPending={isPending}>
          변경하기
        </Button>
      </div>
      <ImageInput
        id="profile-image"
        type="my-profile"
        onChange={handleFileChange}
        defaultValue={user?.image ?? ""}
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
          defaultValue={user?.nickname}
          errorMessage={errorMessage}
          onChange={handleNickNameChange}
        />
      </div>
    </form>
  );
}
