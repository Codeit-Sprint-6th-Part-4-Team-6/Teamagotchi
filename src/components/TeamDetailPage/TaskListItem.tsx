import { GroupTaskLists } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useRouter } from "next/router";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import AddOrEditTaskListModal from "@components/commons/modal/AddOrEditTaskListModal";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { deleteTaskList } from "@api/taskListApi";
import TaskListProgress from "./TaskListProgress";
import { DeleteTaskListModal } from "./TeamPageModal";

export default function TaskListItem({
  task,
  index,
  role,
  onClick,
}: {
  task: GroupTaskLists;
  index: number;
  role: string;
  onClick: () => void;
}) {
  // 색상 배열 정의
  const colors = [
    "bg-point-purple",
    "bg-point-blue",
    "bg-point-cyan",
    "bg-point-pink",
    "bg-point-rose",
    "bg-point-red",
    "bg-point-orange",
    "bg-point-yellow",
    "bg-point-green",
  ];

  // index에 따라 색상 선택
  const colorClass = colors[index % colors.length];
  const router = useRouter();
  const { teamId } = router.query;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteTaskListMutation = useMutation({
    mutationFn: () => deleteTaskList(teamId, task.id.toString()),
    onSuccess: () => {
      toast("success", "해당 목록이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["team", teamId] });
    },
    onError: (error: any) => {
      toast("danger", error.response?.data?.message || "삭제에 실패했습니다.");
    },
  });

  const { openModal, closeModal } = useModal();

  const deleteOnConfirm = () => {
    deleteTaskListMutation.mutate();
    closeModal();
  };

  const handleDeleteTaskListOpenModal = () => {
    openModal("DeleteTaskListModal", DeleteTaskListModal, { onConfirm: deleteOnConfirm });
  };

  const handleModifyTaskListOpenModal = () => {
    openModal("EditTaskListModal", AddOrEditTaskListModal, {
      taskListId: task.id.toString(),
      initialTaskName: task.name,
    });
  };

  return (
    <div
      onClick={onClick}
      className="flex h-40 cursor-pointer items-center rounded-12 border bg-background-secondary text-md transition-all hover:scale-105 hover:border-solid"
    >
      <div className={classNames("h-full w-12 rounded-l-12", colorClass)} />
      <p className="grow truncate px-12 font-medium">{task.name}</p>
      <div className="mr-5 flex items-center">
        <TaskListProgress tasks={task.tasks} />
        {role === "ADMIN" ? (
          <EditDeletePopover
            icon="kebabSmall"
            handleDelete={handleDeleteTaskListOpenModal}
            handleModify={handleModifyTaskListOpenModal}
          />
        ) : null}
      </div>
    </div>
  );
}
