import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/router";
import TextButton from "@components/commons/Button/TextButton";
import Popover from "@components/commons/Popover";
import OneInputModal from "@components/commons/modal/OneInputModal";
import { useModal } from "@hooks/useModal";
import { IconArrowLeftBg, IconArrowRightBg, IconCalenderBg } from "@utils/icon";
import { postTaskList } from "@api/taskListApi";
import Calendar from "./Calendar";

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
};

export default function DateWithCalendar({ date, onDateChange }: Props) {
  const { openModal } = useModal();
  const handleOpenOneInputModal = () => {
    openModal("OneInputModal", AddTaskListModal, {});
  };

  const handleDateSelect = (newDate: Date) => {
    onDateChange(newDate);
  };

  const handlePrevDay = () => {
    onDateChange(addDays(date, -1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(date, 1));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-12">
        <time className="min-w-100">{format(date, "MM월 dd일 (eee)", { locale: ko })}</time>
        <span className="flex gap-4">
          <IconArrowLeftBg className="cursor-pointer" onClick={handlePrevDay} />
          <IconArrowRightBg className="cursor-pointer" onClick={handleNextDay} />
        </span>
        <Popover>
          <Popover.Toggle>
            <IconCalenderBg className="cursor-pointer" />
          </Popover.Toggle>
          <Popover.Wrapper>
            <Calendar onDateSelect={handleDateSelect} selectedDate={date} />
          </Popover.Wrapper>
        </Popover>
      </div>
      <TextButton icon="plus" onClick={handleOpenOneInputModal}>
        새로운 목록 추가하기
      </TextButton>
    </div>
  );
}

function AddTaskListModal({ onClose }: { onClose?: () => void }) {
  const { closeModal } = useModal();

  const queryClient = useQueryClient();
  const router = useRouter();
  const { teamId } = router.query;
  const [taskName, setTaskName] = useState("");
  const handleTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleConfirm = () => {
    postTaskListMutation.mutate();
  };

  const postTaskListMutation = useMutation({
    mutationFn: () => postTaskList(teamId, taskName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group"] });
      closeModal();
    },
  });

  return (
    <OneInputModal
      title="새로운 목록 추가"
      content="할 일에 대한 목록을 추가하고<br> 목록별 할 일을 만들 수 있습니다."
      placeholder="목록 이름을 입력해주세요."
      buttonText="만들기"
      onConfirm={handleConfirm}
      onClose={onClose}
      value={taskName}
      onChange={handleTaskName}
      isPending={postTaskListMutation.isPending}
    />
  );
}
