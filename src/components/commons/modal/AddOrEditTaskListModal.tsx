import { ChangeEvent, useState } from "react";
import { TaskListInfo } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import OneInputModal from "@components/commons/modal/OneInputModal";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { patchTaskList, postTaskList } from "@api/taskListApi";

export default function AddOrEditTaskListModal({
  onClose,
  taskListId = "",
  initialTaskName = "",
}: {
  onClose?: () => void;
  taskListId?: string;
  initialTaskName?: string;
}) {
  const { closeModal } = useModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { teamId } = router.query;

  const [taskName, setTaskName] = useState(initialTaskName || "");

  const handleTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleConfirm = () => {
    if (taskListId) {
      patchTaskListMutation.mutate();
    } else {
      postTaskListMutation.mutate();
    }
  };

  const postTaskListMutation = useMutation<TaskListInfo>({
    mutationFn: () => postTaskList(teamId, taskName),
    onSuccess: (data: TaskListInfo) => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["group"] });
      router.push(`/teams/${teamId}/task-lists/${data.id}`, undefined, { shallow: true });
    },
    onError: (error: any) => {
      toast("danger", `${error.response?.data?.message || "목록 생성에 실패했습니다."}`);
    },
  });

  const patchTaskListMutation = useMutation<TaskListInfo>({
    mutationFn: () => patchTaskList(teamId, taskListId, taskName),
    onSuccess: (data: TaskListInfo) => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["group"] });
      router.push(`/teams/${teamId}/task-lists/${data.id}`, undefined, { shallow: true });
    },
    onError: (error: any) => {
      toast("danger", `${error.response?.data?.message || "목록 수정에 실패했습니다."}`);
    },
  });

  return (
    <OneInputModal
      title={taskListId ? "목록 수정" : "새로운 목록 추가"}
      content={
        taskListId
          ? "할 일 목록의 이름을 수정할 수 있습니다."
          : "할 일에 대한 목록을 추가하고 목록별 할 일을 만들 수 있습니다."
      }
      placeholder="목록 이름을 입력해주세요."
      buttonText={taskListId ? "수정하기" : "만들기"}
      onConfirm={handleConfirm}
      onClose={onClose}
      value={taskName}
      onChange={handleTaskName}
      isPending={taskListId ? patchTaskListMutation.isPending : postTaskListMutation.isPending}
    />
  );
}
