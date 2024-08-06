import { Membership } from "@coworkers-types";
import Image from "next/image";
import Link from "next/link";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import { useModal } from "@hooks/useModal";
import { IconMember } from "@utils/icon";
import DeleteTeamModal from "./DeleteTeamModal";

interface TeamItemProps {
  data: Membership;
}

export default function TeamItem({ data }: TeamItemProps) {
  const { openModal } = useModal();

  const handleModify = () => {
    // eslint-disable-next-line no-restricted-globals
    location.href = `/team/${data.groupId}/edit`;
  };

  const handleOpenModal = () => {
    // TODO: groupId 넘겨주기
    openModal("DeleteTeamModal", DeleteTeamModal, {});
  };
  return (
    <li
      key={data.groupId}
      className="mb-15 flex h-80 items-center rounded-8 px-15 hover:bg-background-tertiary"
    >
      <Link href={`/team/${data.groupId}`} className="flex w-full items-center justify-around">
        <div className="relative h-50 w-50 flex-shrink-0 overflow-hidden rounded-6">
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
        <p className="flex-grow pl-20 text-left text-lg">{data.group.name}</p>
      </Link>
      {data.role === "ADMIN" ? (
        <EditDeletePopover
          icon="kebab"
          handleModify={handleModify}
          handleDelete={handleOpenModal}
        />
      ) : (
        <></>
      )}
    </li>
  );
}
