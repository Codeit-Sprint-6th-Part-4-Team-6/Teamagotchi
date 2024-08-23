import { TaskDone } from "@coworkers-types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Label from "@components/commons/Label";
import CustomModal from "@components/commons/modal/CustomModal";
import { useModal } from "@hooks/useModal";
import { IconCheckboxActive } from "@utils/icon";

type TaskHistoryProps = {
  completedTaskList: TaskDone[];
};

/**
 * 특정 날짜(하루)의 완료된 일들을 받아 렌더링합니다.
 * @prop completedTaskList: TaskDone[];
 */

export default function TaskHistory({ completedTaskList }: TaskHistoryProps) {
  return (
    <div className="mb-40 flex flex-col gap-16">
      <Label content={format(completedTaskList[0].doneAt, "yyyy년 MM월 dd일")} />
      {completedTaskList.map((task) => (
        <CompletedTask task={task} key={task.id} />
      ))}
    </div>
  );
}

/**
 * task 하나의 정보를 받아 렌더링합니다.
 */

export function CompletedTask({ task }: { task: TaskDone }) {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal("TimeNotificationModal", TimeNotificationModal, {
      content: format(task.doneAt, "a h시 m분 s초", { locale: ko }),
    });
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-7 rounded-[8px] bg-background-secondary px-10 py-14 text-md font-normal text-text-primary line-through"
      onClick={handleClick}
    >
      <IconCheckboxActive className="flex-shrink-0" />
      {task.name}
    </div>
  );
}

function TimeNotificationModal({ content, onClose }: { content?: string; onClose?: () => void }) {
  return (
    <CustomModal
      onClose={onClose}
      closeIcon
      content={
        <>
          <p className="mb-24 text-2lg font-medium text-brand-primary">완료 시각</p>
          <p className="modal-title">{content}</p>
        </>
      }
    />
  );
}
