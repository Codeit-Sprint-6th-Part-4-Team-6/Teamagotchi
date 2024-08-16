import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useRouter } from "next/router";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { deleteTaskList } from "@api/taskListApi";
import TaskListProgress from "./TaskListProgress";
import { ITask, ITaskList } from "./TaskTypes";
import { DeleteTaskListModal } from "./TeamPageModal";

export default function TaskListItem({
  task,
  index,
  role,
}: {
  task: ITaskList;
  index: number;
  role: string;
}) {
  // 색상 배열 정의
  const colors = [
    "bg-point-purple", // 보라색
    "bg-point-blue", // 파란색
    "bg-point-cyan", // 하늘색
    "bg-point-pink", // 핑크색
    "bg-point-rose", // 장미색
    "bg-point-red", // 빨간색
    "bg-point-orange", // 주황색
    "bg-point-yellow", // 노란색
    "bg-point-green", // 초록색
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
      toast("success", "해당 팀이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["team", teamId] });
    },
  });

  const { openModal, closeModal } = useModal();

  const deleteOnConfirm = () => {
    deleteTaskListMutation.mutate();
    closeModal();
  };

  const handleOpenModal = () => {
    openModal("DeleteTaskListModal", DeleteTaskListModal, { onConfirm: deleteOnConfirm });
  };

  return (
    <div className="flex h-40 items-center rounded-12 bg-background-secondary text-md">
      <div className={classNames("h-full w-12 rounded-l-12", colorClass)} />
      <p className="grow truncate px-12 font-medium">{task.name}</p>
      <div className="mr-5 flex items-center">
        <TaskListProgress tasks={task.tasks as ITask[]} />
        {role === "ADMIN" ? (
          <EditDeletePopover
            icon="kebabSmall"
            handleDelete={handleOpenModal}
            handleModify={() => {}}
          />
        ) : null}
      </div>
    </div>
  );
}
