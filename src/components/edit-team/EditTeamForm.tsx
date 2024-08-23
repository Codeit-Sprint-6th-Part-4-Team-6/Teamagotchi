import { useEffect, useState } from "react";
import { User } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { useUpdateForm } from "@hooks/useUpdateForm";
import { validateImage } from "@utils/validateImage";
import { patchGroupProfile } from "@api/groupApi";

export default function EditTeamForm() {
  const router = useRouter();
  const teamId = Number(router.query.teamId);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]);

  // teamId가 유효한지 확인
  if (teamId === undefined || teamId <= 0) {
    return null;
  }

  const [prevGroupImage, setPrevGroupImage] = useState<string | undefined | null>(null);
  const [prevGroupName, setPrevGroupName] = useState<string | undefined>("");

  const { errorMessage, handleFileChange, handleNameChange, handleSubmit, isPending } =
    useUpdateForm({
      initialImage: prevGroupImage ?? "",
      initialName: prevGroupName ?? "",
      onSubmit: async (profile, id) => {
        if (id !== undefined) {
          const payload: { name?: string; image?: string | null } = {};

          if (profile.name) {
            payload.name = profile.name;
          }

          if (profile.image !== undefined) {
            payload.image = profile.image === "" ? null : profile.image;
          }

          await patchGroupProfile(payload, teamId);
        }
      },
      successMessage: "팀이 성공적으로 수정되었습니다.",
      query: "user",
      requestId: teamId,
    });

  const handleGroupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event);
  };

  useEffect(() => {
    if (user && teamId) {
      const prevGroupIdx = user.memberships
        .map(({ group }) => group)
        .findIndex((item) => item.id === teamId);

      if (prevGroupIdx !== -1 && prevGroupIdx !== undefined) {
        setPrevGroupImage(validateImage(user.memberships[prevGroupIdx]?.group.image));
        setPrevGroupName(user.memberships[prevGroupIdx]?.group.name);
      }
    }
  }, [teamId, user?.memberships]);

  return (
    <form onSubmit={handleGroupSubmit} className="w-full">
      <Label type="label" content="팀 프로필" htmlFor="team-profile" marginBottom={12} />
      <ImageInput
        id="team-profile"
        type="team-profile"
        onChange={handleFileChange}
        className="mb-24"
        defaultValue={prevGroupImage ?? ""}
      />
      <Label type="label" content="팀 이름" htmlFor="team-name" marginBottom={12} />
      <Input
        id="team-name"
        name="name"
        type="text"
        placeholder={prevGroupName ?? ""}
        errorMessage={errorMessage}
        onChange={handleNameChange}
      />
      <Button className="mt-40" type="submit" isPending={isPending}>
        수정하기
      </Button>
    </form>
  );
}
