import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Spinner from "@components/commons/Spinner";
import { useToast } from "@hooks/useToast";
import { IconAlert } from "@utils/icon";
import { deleteRecurringTask, deleteTask } from "@api/taskApi";
import CheckButton from "./CheckButton";

export default function DeleteModal({
  onClose,
  taskId,
  recurringId,
  type = "tasklist",
  frequency,
}: {
  onClose?: () => void;
  taskId?: string;
  recurringId?: string;
  type?: "tasklist" | "sidebar";
  frequency?: string;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const [onceChecked, setOnceChecked] = useState(true);
  const [recurringChecked, setRecurringChecked] = useState(false);

  const taskOnceDeleteMutation = useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskList"] });
      queryClient.invalidateQueries({ queryKey: ["taskListDetail", Number(taskId)] });
      toast("success", "할 일을 삭제했습니다.");
      onClose?.();
      if (type === "sidebar") router.reload();
    },
    onError: () => {
      toast("danger", "할 일 삭제에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const taskRecurringDeleteMutation = useMutation({
    mutationFn: () => deleteRecurringTask(recurringId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskList"] });
      toast("success", "반복 할 일을 삭제했습니다.");
      onClose?.();
    },
    onError: () => {
      toast("danger", `할 일 삭제에 실패했습니다. 다시 시도해 주세요.}`);
    },
  });

  const handleOnceCheckButton = () => {
    setOnceChecked((prev) => !prev);
    setRecurringChecked(false);
  };

  const handleRecurringCheckButton = () => {
    setRecurringChecked((prev) => !prev);
    setOnceChecked(false);
  };

  const handleDeleteButton = () => {
    if (onceChecked) {
      taskOnceDeleteMutation.mutate();
    } else if (recurringChecked) {
      taskRecurringDeleteMutation.mutate();
    } else {
      taskOnceDeleteMutation.mutate();
    }
  };

  if (taskOnceDeleteMutation.isPending || taskRecurringDeleteMutation.isPending) {
    return <Spinner />;
  }

  return (
    <div className="modal">
      <IconAlert className="mb-16" />
      <p className="mb-16 font-medium text-text-primary">할 일을 삭제하시겠습니까?</p>
      {frequency !== "ONCE" && (
        <>
          <div className="mb-6 flex gap-10">
            <CheckButton type="delete" isChecked={onceChecked} onChange={handleOnceCheckButton} />
            <span className="text-14 font-medium text-text-primary">이번 할 일만 삭제</span>
          </div>
          <div className="flex gap-10">
            <CheckButton
              type="delete"
              isChecked={recurringChecked}
              onChange={handleRecurringCheckButton}
            />
            <span className="text-14 font-medium text-text-primary">모든 반복 할 일 삭제</span>
          </div>
        </>
      )}

      <div className="mt-20 flex gap-10 md:w-260">
        <Button buttonStyle="outlined-secondary" onClick={onClose} size="medium">
          닫기
        </Button>
        <Button buttonStyle="danger" onClick={handleDeleteButton} size="medium">
          삭제
        </Button>
      </div>
    </div>
  );
}
