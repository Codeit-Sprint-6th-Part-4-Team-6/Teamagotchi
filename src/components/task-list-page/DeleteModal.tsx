import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@components/commons/Spinner";
import WarnModal from "@components/commons/modal/WarnModal";
import { useToast } from "@hooks/useToast";
import { deleteRecurringTask, deleteTask } from "@api/taskApi";

export default function DeleteModal({
  onClose,
  taskId,
  recurringId,
  type,
}: {
  onClose?: () => void;
  taskId?: string;
  recurringId?: string;
  type?: "ONCE" | "RECURRING";
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const taskOnceDeleteMutation = useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskList"] });
      toast("success", "할 일을 삭제했습니다.");
      onClose?.();
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

  const handleOnceDelete = () => {
    taskOnceDeleteMutation.mutate();
  };

  const handleRecurringDelete = () => {
    taskRecurringDeleteMutation.mutate();
  };

  if (taskOnceDeleteMutation.isPending || taskRecurringDeleteMutation.isPending) {
    return <Spinner />;
  }

  return (
    <WarnModal
      onConfirm={type === "ONCE" ? handleOnceDelete : handleRecurringDelete}
      buttonText="삭제"
      title={type === "ONCE" ? "할 일을 삭제 하시겠습니까?" : "반복 할 일을 삭제 하시겠습니까?"}
      warnIcon
      onClose={onClose}
    />
  );
}
