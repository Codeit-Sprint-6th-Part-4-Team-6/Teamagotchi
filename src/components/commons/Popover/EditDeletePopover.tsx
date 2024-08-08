import { IconGear, IconKebabLarge, IconKebabSmall } from "@utils/icon";
import Popover from ".";

/**
 * @prop icon: "kebabLarge" | "kebabSmall" | "gear"; 해당 팝오버를 토글시키는 버튼의 모양을 지정합니다.
 * @prop handleModify: () => void; 수정하기 버튼을 클릭했을 때 실행할 함수입니다.
 * @prop handleDelete: () => void; 삭제하기 버튼을 클릭했을 때 실행할 함수입니다.
 */

export default function EditDeletePopover({
  icon,
  handleModify,
  handleDelete,
}: {
  icon: "kebabLarge" | "kebabSmall" | "gear";
  handleModify: () => void;
  handleDelete: () => void;
}) {
  return (
    <Popover>
      <Popover.Toggle>
        {icon === "gear" && <IconGear />}
        {icon === "kebabLarge" && <IconKebabLarge />}
        {icon === "kebabSmall" && <IconKebabSmall />}
      </Popover.Toggle>
      <Popover.Wrapper popDirection="left">
        <Popover.Item onClick={handleModify}>수정하기</Popover.Item>
        <Popover.Item onClick={handleDelete}>삭제하기</Popover.Item>
      </Popover.Wrapper>
    </Popover>
  );
}
