import { UserInfo } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import ImageInput from "@components/commons/Input/ImageInput";

export default function EditUserForm() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as UserInfo;

  return (
    <ImageInput
      id="profile-image"
      type="my-profile"
      onChange={() => {}}
      defaultValue={user.image ?? ""}
    />
  );
}
