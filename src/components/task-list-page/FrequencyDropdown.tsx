import Dropdown from "@components/commons/Dropdown";

type Props = {
  selectedValue: string;
  onSelect: (value: string) => void;
};

export default function FrequencyDropdown({ selectedValue, onSelect }: Props) {
  return (
    <Dropdown selectedValue={selectedValue} onSelect={onSelect}>
      <Dropdown.Toggle>한 번</Dropdown.Toggle>
      <Dropdown.Wrapper>
        <Dropdown.Item value="ONCE">한 번</Dropdown.Item>
        <Dropdown.Item value="DAILY">매일</Dropdown.Item>
        <Dropdown.Item value="WEEKLY">주 반복</Dropdown.Item>
        <Dropdown.Item value="MONTHLY">월 반복</Dropdown.Item>
      </Dropdown.Wrapper>
    </Dropdown>
  );
}
