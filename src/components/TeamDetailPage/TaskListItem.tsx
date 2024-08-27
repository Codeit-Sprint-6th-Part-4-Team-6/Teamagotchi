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
  taskList,
  role,
  onClick,
  isDragging,
}: {
  taskList: GroupTaskLists;
  role: string;
  onClick: () => void;
  isDragging: boolean;
}) {
  // 색상 배열 정의
  const colors = [
    "bg-point-purple",
    "bg-point-indigo",
    "bg-point-blue",
    "bg-point-cyan",
    "bg-point-pink",
    "bg-point-red",
    "bg-point-orange",
    "bg-point-yellow",
    "bg-point-lime",
    "bg-point-green",
  ];

  const colorClass = colors[taskList.id % colors.length];
  const router = useRouter();
  const { teamId } = router.query;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteTaskListMutation = useMutation({
    mutationFn: () => deleteTaskList(teamId, taskList.id.toString()),
    onSuccess: () => {
      toast("success", "해당 목록이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["group", teamId] });
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
      taskListId: taskList.id.toString(),
      initialTaskName: taskList.name,
    });
  };

  const classnames = classNames(
    "relative flex h-40 cursor-pointer items-center rounded-12 bg-background-secondary text-md transition-all hover:bg-background-tertiary",
    isDragging && "bg-background-tertiary"
  );

  return (
    <div onClick={onClick} className={classnames}>
      <div className={classNames("h-full w-12 rounded-l-12", colorClass)} />
      <p className="grow truncate px-12 font-medium">{taskList.name}</p>
      <div className="mr-5 flex items-center">
        <TaskListProgress tasks={taskList.tasks} />
        {role === "ADMIN" || role === "MEMBER" ? (
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
