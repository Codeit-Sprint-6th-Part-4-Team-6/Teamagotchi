import { DateTask, PatchTaskRequest } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import { useModal } from "@hooks/useModal";
import { IconArrowReload, IconCalender, IconComment } from "@utils/icon";
import { patchTaskCompletionStatus } from "@api/taskApi";
import CheckButton from "./CheckButton";
import DeleteModal from "./DeleteModal";
import EditTaskModal from "./EditTaskModal";

type Props = {
  task: DateTask;
  onClick: () => void;
  isChecked: boolean;
  onCheckTask: (taskId: number, isChecked: boolean) => void;
};

const frequencyMap = {
  ONCE: "한 번",
  DAILY: "매일 반복",
  WEEKLY: "매주 반복",
  MONTHLY: "매월 반복",
};

export default function Task({ task, onClick, isChecked, onCheckTask }: Props) {
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { teamId, taskListsId } = router.query;
  const handleCheckButton = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    onCheckTask(task.id, !isChecked);
    patchTaskMutation.mutate({ done: !isChecked });
  };

  const getFrequencyText = (frequency: keyof typeof frequencyMap) =>
    frequencyMap[frequency] || frequency;

  const patchTaskMutation = useMutation({
    mutationFn: (data: PatchTaskRequest) =>
      patchTaskCompletionStatus(teamId, taskListsId, task.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskList"] });
      queryClient.invalidateQueries({ queryKey: ["taskListDetail", task.id] });
    },
  });

  const handleOpenDeleteModal = () => {
    openModal("WarnModal", DeleteModal, { taskId: task.recurringId });
  };

  const handleOpenEditTaskModal = () => {
    openModal("EditTaskModal", EditTaskModal, { defaultValue: task });
  };

  const lineVariants = {
    checked: { pathLength: 1, opacity: 1 },
    unchecked: { pathLength: 0, opacity: 0 },
  };

  return (
    <motion.div
      whileHover={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className="box-shadow flex w-full cursor-pointer flex-col gap-10 rounded-8 bg-background-secondary px-14 py-12"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-8">
        <div className="flex grow justify-between md:justify-start md:gap-12">
          <div className="flex items-center gap-8">
            <CheckButton isChecked={isChecked} onChange={handleCheckButton} size={20} />
            <div className="relative">
              <span className={classNames("pt-2 text-14")}>{task.name}</span>
              <motion.svg
                className="absolute left-0 top-1/2 h-4 w-full overflow-visible"
                initial={false}
                animate={isChecked ? "checked" : "unchecked"}
              >
                <motion.line
                  x1="0"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#fff"
                  strokeWidth="1.5px"
                  variants={lineVariants}
                  transition={{ duration: 0.2 }}
                />
              </motion.svg>
            </div>
          </div>
          <span className="flex items-center gap-2">
            <IconComment />
            <span className="text-12 text-text-default">{task.commentCount}</span>
          </span>
        </div>
        <EditDeletePopover
          icon="kebabSmall"
          handleModify={handleOpenEditTaskModal}
          handleDelete={handleOpenDeleteModal}
        />
      </div>

      <div className="flex items-center gap-10">
        <span className="flex items-center gap-6">
          <IconCalender />
          <time className="text-12 text-text-default">{format(task.date, "yyyy년 MM월 dd일")}</time>
        </span>
        <span className="h-10 border border-l border-solid border-background-tertiary" />
        <span className="flex items-center gap-6">
          <IconArrowReload />
          <span className="text-12 text-text-default">
            {getFrequencyText(task.frequency as keyof typeof frequencyMap)}
          </span>
        </span>
      </div>
    </motion.div>
  );
}
