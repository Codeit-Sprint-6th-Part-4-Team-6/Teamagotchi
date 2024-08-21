import { Dispatch, SetStateAction } from "react";
import { PatchTaskRequest, TaskDetails } from "@coworkers-types";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Button from "@components/commons/Button";
import NameTag from "@components/commons/NameTag";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import TaskCommentList from "@components/task-list/TaskCommentList";
import { IconCalender, IconCheckActive, IconClose, IconRepeat, IconTime } from "@utils/icon";
import { getTaskDetails, patchTaskCompletionStatus } from "@api/taskApi";
import CommentInput from "./CommentInput";

export default function Sidebar({
  groupId,
  taskId,
  taskListId,
  isChecked,
  onCheckTask,
  onClose,
}: {
  groupId: string;
  taskId: number;
  taskListId: string;
  isChecked: boolean;
  onCheckTask: (taskId: number, isChecked: boolean) => void;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const { data: TaskDetailData } = useQuery<TaskDetails>({
    queryKey: ["taskListDetail", taskId],
    queryFn: () => getTaskDetails(Number(groupId), Number(taskListId), taskId),
    placeholderData: keepPreviousData,
  });

  const { mutate: taskPatchMutation } = useMutation({
    mutationFn: (data: PatchTaskRequest) =>
      patchTaskCompletionStatus(groupId, taskListId, taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"] });
      queryClient.invalidateQueries({ queryKey: ["taskListDetail", taskId] });
    },
  });

  const handleDoneClick = () => {
    onCheckTask(taskId, !isChecked);
    const done = TaskDetailData?.doneAt === null;
    taskPatchMutation({ done });
  };

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

  const formatClass = classNames("text-text-default text-12");

  const lineClass = classNames("h-10 border border-l border-solid border-background-tertiary");

  const buttonClass = classNames("bottom-24 right-24 lg:bottom-48 lg:right-100");

  const lineVariants = {
    checked: { pathLength: 1, opacity: 1 },
    unchecked: { pathLength: 0, opacity: 0 },
  };

  return (
    <div className="fixed right-0 top-61 z-[15] h-full w-full bg-background-secondary md:left-auto md:top-61 md:w-435 lg:w-779">
      <div className="flex h-full flex-col gap-16 p-24">
        <IconClose className="cursor-pointer" onClick={onClose} />
        {isChecked && (
          <div className="flex items-center gap-6">
            <IconCheckActive />
            <p className="text-brand-primary">완료</p>
          </div>
        )}
        <div className="flex justify-between">
          <div className="relative">
            <p className="text-20 font-bold text-text-primary">{TaskDetailData?.name}</p>
            <motion.svg
              className="absolute left-0 top-1/2 h-4 w-full overflow-visible"
              initial={false}
              animate={isChecked ? "checked" : "unchecked"}
            >
              <motion.line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#fff"
                strokeWidth="1.5px"
                variants={lineVariants}
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          </div>

          <EditDeletePopover icon="kebabLarge" handleModify={() => {}} handleDelete={() => {}} />
        </div>
        <div className="flex justify-between">
          <NameTag
            type="default-6"
            image={TaskDetailData?.writer.image ?? null}
            name={TaskDetailData?.writer.nickname as string}
          />
          <p className="text-14 text-text-secondary">{formattedCreatedDate}</p>
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
        <div className="h-200">
          <p className="text-14 text-text-primary">{TaskDetailData?.description}</p>
        </div>
        <CommentInput taskId={taskId} />
        <TaskCommentList taskId={taskId} />
        <Button
          buttonType="floating"
          icon="check"
          className={buttonClass}
          buttonStyle={isChecked ? "outlined" : "default"}
          onClick={() => handleDoneClick()}
        >
          {isChecked ? "완료 취소하기" : "완료하기"}
        </Button>
      </div>
    </div>
  );
}
