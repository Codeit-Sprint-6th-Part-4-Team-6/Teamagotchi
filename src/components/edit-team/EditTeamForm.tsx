import { User } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { useUpdateForm } from "@hooks/useUpdateForm";
import { patchGroupProfile } from "@api/groupApi";

export default function EditTeamForm() {
  const router = useRouter();
  const teamId = Number(router.query.teamId);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]);

  const prevGroupIdx = user?.memberships
    .map(({ group }) => group)
    .findIndex((item) => item.id === teamId);
  const prevGroupImage = user?.memberships[prevGroupIdx ?? 0].group.image;
  const prevGroupName = user?.memberships[prevGroupIdx ?? 0].group.name;

  const { changedName, errorMessage, handleFileChange, handleNameChange, handleSubmit, isPending } =
    useUpdateForm({
      initialImage: prevGroupImage,
      initialName: prevGroupName ?? "",
      onEditSubmit: (id, profile) =>
        patchGroupProfile(id as number, { name: profile?.name, image: profile?.image }),
      successMessage: "팀이 성공적으로 수정되었습니다.",
      query: "user",
      redirectPath: `/teams/${teamId}`,
    });

  const handleGroupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event, teamId);
  };

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
        placeholder={prevGroupName}
        errorMessage={errorMessage}
        onChange={handleNameChange}
      />
      <Button
        className="mt-40"
        disabled={changedName.length < 1}
        type="submit"
        isPending={isPending}
      >
        수정하기
      </Button>
    </form>
  );
}
