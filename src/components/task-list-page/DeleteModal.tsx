import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Spinner from "@components/commons/Spinner";
import WarnModal from "@components/commons/modal/WarnModal";
import { useToast } from "@hooks/useToast";
import { deleteTask } from "@api/taskApi";

export default function DeleteModal({
  onClose,
  taskId,
  type = "tasklist",
}: {
  onClose?: () => void;
  taskId?: string;
  type?: "tasklist" | "sidebar";
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const taskDeleteMutation = useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskList"] });
      queryClient.invalidateQueries({ queryKey: ["taskListDetail", Number(taskId)] });
      onClose?.();
      if (type === "sidebar") router.reload();
    },
    onError: () => {
      toast("danger", "할 일 삭제에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const handleDelete = () => {
    taskDeleteMutation.mutate();
  };

  if (taskDeleteMutation.isPending) {
    return <Spinner />;
  }

  return (
    <WarnModal
      onConfirm={handleDelete}
      buttonText="삭제"
      title="할 일을 삭제 하시겠습니까?"
      warnIcon
      onClose={onClose}
    />
  );
}
