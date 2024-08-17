import { ChangeEvent, useState } from "react";
import { TaskListInfo } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import OneInputModal from "@components/commons/modal/OneInputModal";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { postTaskList } from "@api/taskListApi";

export default function AddTaskListModal({ onClose }: { onClose?: () => void }) {
  const { closeModal } = useModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { teamId } = router.query;
  const [taskName, setTaskName] = useState("");
  const handleTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleConfirm = () => {
    postTaskListMutation.mutate();
  };

  const postTaskListMutation = useMutation<TaskListInfo>({
    mutationFn: () => postTaskList(teamId, taskName),
    onSuccess: (data: TaskListInfo) => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["group"] });
      router.push(`/teams/${teamId}/task-lists/${data.id}`, undefined, { shallow: true });
    },
    onError: (error: any) => {
      toast("danger", `${error.response.data.message}`);
    },
  });

  return (
    <OneInputModal
      title="새로운 목록 추가"
      content="할 일에 대한 목록을 추가하고<br> 목록별 할 일을 만들 수 있습니다."
      placeholder="목록 이름을 입력해주세요."
      buttonText="만들기"
      onConfirm={handleConfirm}
      onClose={onClose}
      value={taskName}
      onChange={handleTaskName}
      isPending={postTaskListMutation.isPending}
    />
  );
}
