import { Membership } from "@coworkers-types";
import Link from "next/link";
import { useRouter } from "next/router";
import Popover from "@components/commons/Popover";
import { IconToggle } from "@utils/icon";

export function DesktopNavigation({
  curTeamPage,
  groups,
  isPending,
}: {
  curTeamPage: Membership | undefined;
  groups: Membership[] | undefined;
  isPending: boolean;
}) {
  const router = useRouter();

  return (
    <div className="hidden flex-grow items-center gap-10 px-20 text-lg md:flex">
      <Link href="/boards" className="text-nowrap">
        자유게시판
      </Link>
      <Popover>
        <Popover.Toggle>
          {curTeamPage?.group.name || "팀 리스트"} <IconToggle />
        </Popover.Toggle>
        <Popover.Wrapper>
          {groups?.map((group) => (
            <Popover.TeamItem
              key={`group-${group.groupId}`}
              title={group.group.name}
              id={group.groupId}
              imgSrc={group.group.image}
              role={group.role}
              isPending={isPending}
            />
          ))}
          <Popover.InnerButton
            onClick={() => {
              router.push("/add-team");
            }}
          />
        </Popover.Wrapper>
      </Popover>
    </div>
  );
}
