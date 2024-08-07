import { IconPlus } from "@utils/icon";
import Popover from ".";

export default function TeamListPopover() {
  return (
    <Popover>
      <Popover.Toggle>팀 목록 토글 버튼</Popover.Toggle>
      <Popover.Wrapper>
        <Popover.TeamItem imgSrc="/images/cute.jpeg">경영관리 팀</Popover.TeamItem>
        <Popover.TeamItem imgSrc="/images/dog.jpg">프로덕트 팀</Popover.TeamItem>
        <Popover.InnerButton onClick={() => {}}>
          <IconPlus />팀 추가하기
        </Popover.InnerButton>
      </Popover.Wrapper>
    </Popover>
  );
}
