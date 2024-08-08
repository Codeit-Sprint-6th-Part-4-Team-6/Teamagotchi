import TextButton from "@components/commons/Button/TextButton";
import { IconArrowLeftBg, IconArrowRightBg, IconCalenderBg } from "@utils/icon";

export default function Date() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-12">
        <time>5월 18일 (화)</time>
        <span className="flex gap-4">
          <IconArrowLeftBg />
          <IconArrowRightBg />
        </span>
        <IconCalenderBg />
      </div>
      <TextButton icon="plus">새로운 목록 추가하기</TextButton>
    </div>
  );
}
