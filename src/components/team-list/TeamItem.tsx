import { GroupInfo } from "@coworkers-types";
import Image from "next/image";
import Link from "next/link";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";

interface TeamItemProps {
  group: GroupInfo;
}

export default function TeamItem({ group }: TeamItemProps) {
  return (
    <li
      key={group.id}
      className="mb-15 flex h-80 items-center rounded-8 px-15 hover:bg-background-tertiary"
    >
      <Link href={`/team/${group.id}`} className="flex w-full items-center justify-around">
        <div className="relative h-50 w-50 flex-shrink-0 overflow-hidden rounded-6">
          <Image
            src="/images/cute.jpeg"
            alt={`${group.name} 이미지`}
            fill
            className="object-cover"
          />
        </div>
        <p className="flex-grow pl-15 text-left text-lg">{group.name}</p>
      </Link>
      <EditDeletePopover icon="kebab" handleModify={() => {}} handleDelete={() => {}} />
    </li>
  );
}
