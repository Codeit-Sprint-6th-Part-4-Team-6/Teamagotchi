import { useState } from "react";
import { DateTask, PatchTaskRequest } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/router";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import {
  IconArrowReload,
  IconCalender,
  IconCheckboxActive,
  IconCheckboxDefault,
  IconComment,
  IconTime,
} from "@utils/icon";
import { patchTaskCompletionStatus } from "@api/taskApi";

type Props = {
  task: DateTask;
};

const frequencyMap = {
  ONCE: "한 번",
  DAILY: "매일 반복",
  WEEKLY: "매주 반복",
  MONTHLY: "매월 반복",
};

export default function Task({ task }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { teamId, taskListsId } = router.query;
  const [isChecked, setIsChecked] = useState(task.doneAt !== null);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleCheckButton = () => {
    setIsChecked((prev) => !prev);
    taskPatchMutation.mutate({ done: !isChecked });
  };

  const getFrequencyText = (frequency: keyof typeof frequencyMap) =>
    frequencyMap[frequency] || frequency;

  const taskPatchMutation = useMutation({
    mutationFn: (data: PatchTaskRequest) =>
      patchTaskCompletionStatus(teamId, taskListsId, task.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"] });
    },
  });

  const handleDelete = () => {};

  return (
    <div className="mb-16 flex w-full cursor-pointer flex-col gap-10 rounded-8 bg-background-secondary px-14 py-12">
      <div className="flex items-center justify-between gap-8">
        <div className="flex grow justify-between md:justify-start md:gap-12">
          <div className="flex items-center gap-8">
            <button onClick={handleCheckButton}>
              {isChecked ? <IconCheckboxActive /> : <IconCheckboxDefault />}
            </button>
            <span className={classNames("pt-2 text-14", { "line-through": isChecked })}>
              {task.name}
            </span>
          </div>
          <span className="flex items-center gap-2">
            <IconComment />
            <span className="text-12 text-text-default">{task.commentCount}</span>
          </span>
        </div>
        <EditDeletePopover
          icon="kebabSmall"
          handleModify={() => setIsEditMode(true)}
          handleDelete={handleDelete}
        />
      </div>

      <div className="flex items-center gap-10">
        <span className="flex items-center gap-6">
          <IconCalender />
          <time className="text-12 text-text-default">
            {format(task.date, "yyyy년 MM월 dd일", { locale: ko })}
          </time>
        </span>
        <span className="h-10 border border-l border-solid border-background-tertiary" />
        <span className="flex items-center gap-6">
          <IconTime />
          <time className="text-12 text-text-default">
            {format(new Date(task.date), "a h:mm", { locale: ko })}
          </time>
        </span>
        <span className="h-10 border border-l border-solid border-background-tertiary" />
        <span className="flex items-center gap-6">
          <IconArrowReload />
          <span className="text-12 text-text-default">
            {getFrequencyText(task.frequency as keyof typeof frequencyMap)}
          </span>
        </span>
      </div>
    </div>
  );
}
