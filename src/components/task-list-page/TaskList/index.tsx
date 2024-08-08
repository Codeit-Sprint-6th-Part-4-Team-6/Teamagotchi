import Task from "../Task";

export default function TaskList() {
  return (
    <div>
      <div className="mb-16 mt-19 flex gap-12 text-text-default">
        <span className="flex flex-col gap-5">
          <span>법인 설립</span>
          <span className="w-full border-b-[1.5px] border-solid border-text-inverse" />
        </span>
        <span>법인 등기</span>
        <span>정기 주총</span>
        <span>기타</span>
      </div>
      <Task />
    </div>
  );
}
