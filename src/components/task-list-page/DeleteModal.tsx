import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@components/commons/Spinner";
import WarnModal from "@components/commons/modal/WarnModal";
import { useToast } from "@hooks/useToast";
import { deleteTask } from "@api/taskApi";

export default function DeleteModal({
  onClose,
  taskId,
}: {
  onClose?: () => void;
  taskId?: string;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const taskDeleteMutation = useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"] });
      onClose?.();
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
