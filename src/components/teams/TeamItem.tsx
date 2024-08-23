import { Membership } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import Spinner from "@components/commons/Spinner";
import TeamDefault from "@components/commons/TeamDefault";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { IconMember } from "@utils/icon";
import { validateImage } from "@utils/validateImage";
import { deleteGroup } from "@api/groupApi";
import DeleteTeamModal from "./DeleteTeamModal";

interface TeamItemProps {
  data: Membership;
}

export default function TeamItem({ data }: TeamItemProps) {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleModify = () => {
    router.push(`/teams/${data.groupId}/edit`);
  };

  const deleteGroupMutation = useMutation({
    mutationFn: (groupId: number) => deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast("success", "팀 삭제에 성공했습니다.");
    },
  });

  const deleteOnConfirm = () => {
    deleteGroupMutation.mutate(data.groupId);
    closeModal();
  };

  const handleOpenModal = () => {
    openModal("DeleteTeamModal", DeleteTeamModal, { onConfirm: deleteOnConfirm });
  };

  if (deleteGroupMutation.isPending) {
    return <Spinner />;
  }

  return (
    <li
      key={data.groupId}
      className="flex h-60 items-center rounded-8 bg-text-tertiary/10 p-8 after:hover:bg-background-tertiary md:h-80 md:p-15"
    >
      <Link href={`/teams/${data.groupId}`} className="flex w-full items-center justify-around">
        <div className="relative h-50 w-50 flex-shrink-0 overflow-hidden rounded-6">
          {validateImage(data.group.image) ? (
            <Image
              src={data.group.image}
              alt={`${data.group.name} 이미지`}
              fill
              className="object-cover"
            />
          ) : (
            <TeamDefault />
          )}
        </div>
        <p className="flex-grow pl-20 text-left text-14">{data.group.name}</p>
      </Link>
      {data.role === "ADMIN" && (
        <EditDeletePopover
          icon="kebabLarge"
          handleModify={handleModify}
          handleDelete={handleOpenModal}
        />
      )}
    </li>
  );
}
