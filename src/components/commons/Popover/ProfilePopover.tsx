import Popover from ".";

export default function ProfilePopover() {
  return (
    <Popover>
      <Popover.Toggle>프로필 토글 버튼</Popover.Toggle>
      <Popover.Wrapper>
        <Popover.Item onClick={() => {}}>마이 히스토리</Popover.Item>
        <Popover.Item onClick={() => {}}>계정 설정</Popover.Item>
        <Popover.Item onClick={() => {}}>팀 참여</Popover.Item>
        <Popover.Item onClick={() => {}}>로그아웃</Popover.Item>
      </Popover.Wrapper>
    </Popover>
  );
}
