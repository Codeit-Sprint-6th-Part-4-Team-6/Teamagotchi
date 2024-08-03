import Popover from ".";

export default function FrequencyPopover() {
  return (
    <Popover>
      <Popover.Toggle>토글 버튼</Popover.Toggle>
      <Popover.Wrapper>
        <Popover.Item>한 번</Popover.Item>
        <Popover.Item>매일</Popover.Item>
        <Popover.Item>주 반복</Popover.Item>
        <Popover.Item>월 반복</Popover.Item>
      </Popover.Wrapper>
    </Popover>
  );
}
