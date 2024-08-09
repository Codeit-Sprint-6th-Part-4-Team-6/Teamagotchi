import { useState } from "react";
import { LocalUser } from "@coworkers-types";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";

export default function EditUserForm() {
  const data: LocalUser = JSON.parse(localStorage.getItem("userStore") ?? "");
  const { user } = data.state;
  const [isPending, setIsPending] = useState(false);

  return (
    <form className="flex flex-col gap-24">
      <div className="absolute right-0 top-24 lg:top-40">
        <Button type="submit" size="small" isPending={isPending}>
          변경하기
        </Button>
      </div>
      <ImageInput
        id="profile-image"
        type="my-profile"
        onChange={() => {}}
        defaultValue={user?.image ?? ""}
      />
      <div>
        <Label content="이메일" marginBottom={12} />
        <Input value={user?.email} disabled />
      </div>
      <div>
        <Label htmlFor="nickname" content="이름" marginBottom={12} />
        <Input id="nickname" name="nickname" defaultValue={user?.nickname} />
      </div>
    </form>
  );
}
