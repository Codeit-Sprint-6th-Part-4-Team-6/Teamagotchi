import Dropdown from ".";

export default function FrequencyDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle>토글 버튼</Dropdown.Toggle>
      <Dropdown.Wrapper>
        <Dropdown.Item>한 번</Dropdown.Item>
        <Dropdown.Item>매일</Dropdown.Item>
        <Dropdown.Item>주 반복</Dropdown.Item>
        <Dropdown.Item>월 반복</Dropdown.Item>
      </Dropdown.Wrapper>
    </Dropdown>
  );
}
