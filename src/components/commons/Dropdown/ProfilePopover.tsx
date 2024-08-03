import Popover from ".";

export default function ProfilePopover() {
  return (
    <Popover>
      <Popover.Toggle>프로필 토글 버튼</Popover.Toggle>
      <Popover.Wrapper align="center">
        <Popover.Item>마이 히스토리</Popover.Item>
        <Popover.Item>계정 설정</Popover.Item>
        <Popover.Item>팀 참여</Popover.Item>
        <Popover.Item>로그아웃</Popover.Item>
      </Popover.Wrapper>
    </Popover>
  );
}
