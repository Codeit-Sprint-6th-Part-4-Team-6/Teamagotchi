import { useRouter } from "next/router";
import NameTag from "@components/commons/NameTag";
import Popover from "@components/commons/Popover";

export function UserPopoverMenu({ user, handleSignOut }: { user: any; handleSignOut: () => void }) {
  const router = useRouter();

  return (
    <Popover>
      <Popover.Toggle>
        <NameTag type="profile" name={user.nickname} image={user.image} />
      </Popover.Toggle>
      <Popover.Wrapper popDirection="left">
        <Popover.NameInfoItem>{user.nickname}</Popover.NameInfoItem>
        <Popover.Item onClick={() => router.push("/user/history")}>마이 히스토리</Popover.Item>
        <Popover.Item onClick={() => router.push("/user/edit")}>계정 설정</Popover.Item>
        <Popover.Item onClick={() => router.push("/join-team")}>팀 참여</Popover.Item>
        <Popover.Item onClick={handleSignOut}>로그아웃</Popover.Item>
      </Popover.Wrapper>
    </Popover>
  );
}
