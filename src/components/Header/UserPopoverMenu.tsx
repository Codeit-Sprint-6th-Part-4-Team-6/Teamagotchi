import { useRouter } from "next/router";
import NameTag from "@components/commons/NameTag";
import Popover from "@components/commons/Popover";

export function UserPopoverMenu({ user, handleSignOut }: { user: any; handleSignOut: () => void }) {
  const router = useRouter();

  const menuItems = [
    { label: "마이 히스토리", href: "/user/history" },
    { label: "게정 설정", href: "/user/edit" },
    { label: "팀 참여", href: "/join-team" },
  ];

  return (
    <Popover>
      <Popover.Toggle>
        <NameTag type="profile" name={user.nickname} image={user.image} />
      </Popover.Toggle>
      <Popover.Wrapper popDirection="left" className="w-150">
        <Popover.NameInfoItem>{user.nickname}</Popover.NameInfoItem>
        {menuItems.map((item) => (
          <Popover.Item
            key={item.href}
            onClick={() => router.push(item.href)}
            className={router.pathname === item.href ? "bg-background-tertiary" : ""}
          >
            {item.label}
          </Popover.Item>
        ))}
        <Popover.Item onClick={handleSignOut}>로그아웃</Popover.Item>
      </Popover.Wrapper>
    </Popover>
  );
}
