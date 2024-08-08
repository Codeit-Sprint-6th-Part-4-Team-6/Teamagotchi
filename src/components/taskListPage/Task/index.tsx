import {
  IconArrowReload,
  IconCalender,
  IconCheckboxDefault,
  IconComment,
  IconKebabSmall,
  IconTime,
} from "@utils/icon";

export default function Task() {
  return (
    <div className="flex w-full flex-col gap-10 rounded-8 bg-background-secondary px-14 py-12">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <button>
            <IconCheckboxDefault />
          </button>
          <span className="text-14">등기 비용 안내 드리기</span>
        </div>

        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2">
            <IconComment />
            <span className="text-12 text-text-default">3</span>
          </span>
          <IconKebabSmall />
        </div>
      </div>
      <div className="flex items-center gap-10">
        <span className="flex items-center gap-6">
          <IconCalender />
          <time className="text-12 text-text-default">2024년 07월 08일</time>
        </span>
        <span className="h-10 border border-l border-solid border-background-tertiary" />
        <span className="flex items-center gap-6">
          <IconTime />
          <time className="text-12 text-text-default">오후 3:30</time>
        </span>
        <span className="h-10 border border-l border-solid border-background-tertiary" />
        <span className="flex items-center gap-6">
          <IconArrowReload />
          <span className="text-12 text-text-default">매일 반복</span>
        </span>
      </div>
    </div>
  );
}
