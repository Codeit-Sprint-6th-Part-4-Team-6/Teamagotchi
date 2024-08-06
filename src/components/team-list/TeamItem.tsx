import { Membership } from "@coworkers-types";
import Image from "next/image";
import Link from "next/link";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";

interface TeamItemProps {
  data: Membership;
}

export default function TeamItem({ data }: TeamItemProps) {
  return (
    <li
      key={data.groupId}
      className="mb-15 flex h-80 items-center rounded-8 px-15 hover:bg-background-tertiary"
    >
      <Link href={`/team/${data.groupId}`} className="flex w-full items-center justify-around">
        <div className="relative h-50 w-50 flex-shrink-0 overflow-hidden rounded-6">
          <Image
            src="/images/cute.jpeg"
            alt={`${data.group.name} 이미지`}
            fill
            className="object-cover"
          />
        </div>
        <p className="flex-grow pl-15 text-left text-lg">{data.group.name}</p>
      </Link>
      {data.role === "ADMIN" ? (
        <EditDeletePopover icon="kebab" handleModify={() => {}} handleDelete={() => {}} />
      ) : (
        <></>
      )}
    </li>
  );
}
