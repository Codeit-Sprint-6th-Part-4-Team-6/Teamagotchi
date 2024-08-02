import { IconPlus } from "@utils/icon";
import Dropdown from ".";

export default function TeamListDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle>팀 목록 토글 버튼</Dropdown.Toggle>
      <Dropdown.Wrapper>
        <Dropdown.TeamItem imgSrc="/images/cute.jpeg">경영관리 팀</Dropdown.TeamItem>
        <Dropdown.TeamItem imgSrc="/images/dog.jpg">프로덕트 팀</Dropdown.TeamItem>
        <Dropdown.InnerButton onClick={() => {}}>
          <IconPlus />팀 추가하기
        </Dropdown.InnerButton>
      </Dropdown.Wrapper>
    </Dropdown>
  );
}
