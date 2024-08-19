import { Dispatch, SetStateAction, useState } from "react";
import {
  PatchTaskRequest,
  TaskComment,
  TaskCommentList as TaskCommentListType,
  TaskDetails,
} from "@coworkers-types";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { format } from "date-fns";
import Button from "@components/commons/Button";
import NameTag from "@components/commons/NameTag";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import Textarea from "@components/commons/TextArea";
import TaskCommentList from "@components/task-list/TaskCommentList";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import {
  IconCalender,
  IconClose,
  IconEnterActive,
  IconEnterDefault,
  IconRepeat,
  IconTime,
} from "@utils/icon";
import { getTaskDetails, patchTaskCompletionStatus } from "@api/taskApi";
import { postTaskComment } from "@api/taskCommentApi";

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
  const [textareaComment, setTextareaComment] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: TaskDetailData } = useQuery<TaskDetails>({
    queryKey: ["taskListDetail", taskId],
    queryFn: () => getTaskDetails(Number(groupId), Number(taskListId), taskId),
    placeholderData: keepPreviousData,
  });

  const { mutate: postComment } = useMutation({
    mutationFn: (content) => postTaskComment(taskId, content),
    onMutate: async (content: string) => {
      await queryClient.cancelQueries({ queryKey: ["taskComments", taskId] });

      const previousComments = queryClient.getQueryData(["taskComments", taskId]);

      queryClient.setQueryData<TaskCommentListType>(
        ["taskComments", taskId],
        (oldComments: TaskCommentListType = []) => [
          {
            id: 1,
            content,
            userId: user?.id ?? 1,
            taskId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
              image: null,
              nickname: user?.nickname ?? "",
              id: user?.id ?? 1,
            },
          },
          ...oldComments,
        ]
      );

      return { previousComments };
    },
    onError: (error, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["taskComments", taskId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["taskComments", taskId] });
    },
    onSuccess: () => {
      toast("success", "댓글을 작성하였습니다.");
      setTextareaComment("");
    },
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

  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaComment(event.target.value);
  };

  const formatClass = classNames("text-text-default text-12");

  const lineClass = classNames("h-10 border border-l border-solid border-background-tertiary");

  const postIconClass = classNames("absolute right-0 top-13 cursor-pointer");

  return (
    <div className="fixed right-0 top-61 z-[15] h-full w-full bg-background-secondary md:left-auto md:top-61 md:w-435 lg:w-779">
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
            <IconEnterActive
              className={postIconClass}
              onClick={() => postComment(textareaComment)}
            />
          ) : (
            <IconEnterDefault className={postIconClass} />
          )}
        </div>
        <TaskCommentList taskId={taskId} />
        <Button
          buttonType="floating"
          icon="check"
          className="bottom-24 right-24 lg:bottom-48 lg:right-100"
          onClick={() => handleDoneClick()}
        >
          {TaskDetailData?.doneAt === null ? "완료하기" : "취소하기"}
        </Button>
      </div>
    </div>
  );
}
