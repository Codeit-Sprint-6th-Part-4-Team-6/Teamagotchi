import Dropdown from ".";

export default function ProfileDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle>프로필 토글 버튼</Dropdown.Toggle>
      <Dropdown.Wrapper align="center">
        <Dropdown.Item>마이 히스토리</Dropdown.Item>
        <Dropdown.Item>계정 설정</Dropdown.Item>
        <Dropdown.Item>팀 참여</Dropdown.Item>
        <Dropdown.Item>로그아웃</Dropdown.Item>
      </Dropdown.Wrapper>
    </Dropdown>
  );
}
