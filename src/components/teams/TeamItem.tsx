import { Membership } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import Spinner from "@components/commons/Spinner";
import { useModal } from "@hooks/useModal";
import { IconMember } from "@utils/icon";
import { deleteGroup } from "@api/groupApi";
import DeleteTeamModal from "./DeleteTeamModal";

interface TeamItemProps {
  data: Membership;
}

export default function TeamItem({ data }: TeamItemProps) {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleModify = () => {
    router.push(`/teams/${data.groupId}/edit`);
  };

  const deleteGroupMutation = useMutation({
    mutationFn: (groupId: number) => deleteGroup(groupId),
    onSuccess: () => {
      // TODO: 토스트
      queryClient.invalidateQueries({ queryKey: ["groups"] });
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
      className="flex h-60 items-center rounded-8 bg-text-tertiary/10 p-8 hover:bg-background-tertiary md:h-80"
    >
      <Link href={`/teams/${data.groupId}`} className="flex w-full items-center justify-around">
        <div className="relative size-45 flex-shrink-0 overflow-hidden rounded-6 md:size-50">
          {data.group.image ? (
            <Image
              src={data.group.image}
              alt={`${data.group.name} 이미지`}
              fill
              className="object-cover"
            />
          ) : (
            <IconMember />
          )}
        </div>
        <p className="flex-grow pl-20 text-left text-14">{data.group.name}</p>
      </Link>
      {data.role === "ADMIN" ? (
        <EditDeletePopover
          icon="kebabLarge"
          handleModify={handleModify}
          handleDelete={handleOpenModal}
        />
      ) : (
        <></>
      )}
    </li>
  );
}
