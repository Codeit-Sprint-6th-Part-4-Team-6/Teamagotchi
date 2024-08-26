import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Spinner from "@components/commons/Spinner";
import WarnModal from "@components/commons/modal/WarnModal";
import { useToast } from "@hooks/useToast";
import { deleteRecurringTask, deleteTask } from "@api/taskApi";

export default function DeleteModal({
  onClose,
  taskId,
  recurringId,
  recurringType,
  type = "tasklist",
}: {
  onClose?: () => void;
  taskId?: string;
  recurringId?: string;
  recurringType?: "ONCE" | "RECURRING";
  type?: "tasklist" | "sidebar";
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

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
      onConfirm={recurringType === "ONCE" ? handleOnceDelete : handleRecurringDelete}
      buttonText="삭제"
      title={
        recurringType === "ONCE" ? "할 일을 삭제 하시겠습니까?" : "반복 할 일을 삭제 하시겠습니까?"
      }
      warnIcon
      onClose={onClose}
    />
  );
}
