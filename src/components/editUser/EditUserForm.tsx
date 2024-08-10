import { useState } from "react";
import { LocalUser } from "@coworkers-types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { patchUser } from "@api/userApi";

export default function EditUserForm() {
  const data: LocalUser = JSON.parse(
    typeof window !== "undefined" ? (localStorage.getItem("userStore") ?? "") : ""
  );
  const { user } = data.state;
  // const { user } = userAuthStore();
  const [image, setImage] = useState<string | File | null>(user.image);
  const [nickname, setNickname] = useState(user.nickname);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (value: string | File | null) => {
    setImage(value);
  };

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const patchUserMutation = useMutation({
    mutationFn: () => patchUser({ nickname, image }),
    onSuccess: () => {
      alert("계정 설정에 성공했습니다.");
    },
    onError: (error: any) => {
      const message = error.response.data?.message;
      setErrorMessage(message);
    },
  });

  const isPending = patchUserMutation.isPending || patchUserMutation.isPending;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nickname) return;

    patchUserMutation.mutate();
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
function userAuthStore(): { user: any } {
  throw new Error("Function not implemented.");
}
