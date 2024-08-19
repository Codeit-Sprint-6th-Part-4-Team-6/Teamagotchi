import { Dispatch, SetStateAction, useState } from "react";
import { TaskCommentList, TaskDetails } from "@coworkers-types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { format } from "date-fns";
import Button from "@components/commons/Button";
import Comment from "@components/commons/Comment";
import Input from "@components/commons/Input";
import NameTag from "@components/commons/NameTag";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import Textarea from "@components/commons/TextArea";
import {
  IconCalender,
  IconClose,
  IconEnterActive,
  IconEnterDefault,
  IconRepeat,
  IconTime,
} from "@utils/icon";
import { getTaskDetails } from "@api/taskApi";
import { getTaskComments } from "@api/taskCommentApi";

export default function Sidebar({
  groupId,
  taskId,
  taskListId,
  onClose,
}: {
  groupId: string;
  taskId: number;
  taskListId: string;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  // const side = useRef();
  const [textareaComment, setTextareaComment] = useState<string>("");

  const { data: TaskDetailData } = useQuery<TaskDetails>({
    queryKey: ["taskListDetail", taskId],
    queryFn: () => getTaskDetails(Number(groupId), Number(taskListId), taskId),
    placeholderData: keepPreviousData,
  });

  const { data: TaskCommentData } = useQuery<TaskCommentList>({
    queryKey: ["taskComments", taskId],
    queryFn: () => getTaskComments(taskId),
    placeholderData: keepPreviousData,
  });

  const formattedCreatedDate = TaskDetailData?.recurring.createdAt
    ? format(new Date(TaskDetailData.recurring.createdAt), "yyyy.MM.dd")
    : "";

  const formattedStartedDate = TaskDetailData?.recurring.startDate
    ? format(new Date(TaskDetailData.recurring.startDate), "yyyy년 M월 dd일")
    : "";

  const formattedStatedTime = TaskDetailData?.recurring.startDate
    ? format(new Date(TaskDetailData.recurring.startDate), "a h:mm")
    : "";

  let frequency = "";

  if (TaskDetailData?.recurring.frequencyType) {
    if (TaskDetailData.recurring.frequencyType === "DAILY") {
      frequency = "매일 반복";
    } else if (TaskDetailData.recurring.frequencyType === "MONTHLY") {
      frequency = `매월 ${TaskDetailData.recurring.monthDay}일`;
    } else if (
      TaskDetailData.recurring.frequencyType === "WEEKLY" &&
      Array.isArray(TaskDetailData.recurring.weekDays)
    ) {
      const dayMap: { [key: number]: string } = {
        1: "월요일",
        2: "화요일",
        3: "수요일",
        4: "목요일",
        5: "금요일",
        6: "토요일",
        7: "일요일",
      };
      const days = TaskDetailData.recurring.weekDays.map((day) => dayMap[day]);
      frequency = `매주 ${days.join(", ")}`;
    }
  }

  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaComment(event.target.value);
  };

  const formatClass = classNames("text-text-default text-12");

  const lineClass = classNames("h-10 border border-l border-solid border-background-tertiary");

  const postIconClass = classNames("absolute right-0 top-13 cursor-pointer");

  return (
    <div className="fixed right-0 top-61 z-[999] h-full w-full bg-background-secondary md:left-auto md:top-61 md:w-435 lg:w-779">
      <div className="flex h-full flex-col gap-16 p-24">
        <IconClose className="cursor-pointer" onClick={onClose} />
        <div className="flex justify-between">
          {TaskDetailData?.name}
          <EditDeletePopover icon="kebabLarge" handleModify={() => {}} handleDelete={() => {}} />
        </div>
        <div className="flex justify-between">
          <NameTag
            type="default-6"
            image={TaskDetailData?.writer.image ?? null}
            name={TaskDetailData?.writer.nickname as string}
          />
          {formattedCreatedDate}
        </div>
        <div className="flex items-center gap-10">
          <IconCalender />
          <p className={formatClass}>{formattedStartedDate}</p>
          <span className={lineClass} />
          <IconTime />
          <p className={formatClass}>{formattedStatedTime}</p>
          <span className={lineClass} />
          <IconRepeat />
          <p className={formatClass}>{frequency}</p>
        </div>
        <div className="h-200 overflow-y-scroll">{TaskDetailData?.description}</div>
        <div className="relative">
          <Textarea
            type="innerButton"
            placeholder="댓글을 달아주세요."
            height={50}
            value={textareaComment}
            onChange={handleChangeTextarea}
          />
          {textareaComment.length > 0 ? (
            <IconEnterActive className={postIconClass} />
          ) : (
            <IconEnterDefault className={postIconClass} />
          )}
        </div>
        {TaskCommentData?.map((comment) => <Comment type="task" comment={comment} />)}
        <Button
          buttonType="floating"
          icon="check"
          className="bottom-24 right-24 lg:bottom-48 lg:right-100"
          onClick={() => console.log("asd")}
        >
          완료하기
        </Button>
      </div>
    </div>
  );
}
