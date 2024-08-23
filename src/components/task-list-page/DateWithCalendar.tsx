import React from "react";
import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import TextButton from "@components/commons/Button/TextButton";
import Popover from "@components/commons/Popover";
import AddOrEditTaskListModal from "@components/commons/modal/AddOrEditTaskListModal";
import useMediaQuery from "@hooks/useMediaQuery";
import { useModal } from "@hooks/useModal";
import { IconArrowLeftBg, IconArrowRightBg, IconCalenderBg } from "@utils/icon";
import Calendar from "./Calendar";

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
};

export default function DateWithCalendar({ date, onDateChange }: Props) {
  const { openModal, closeModal } = useModal();
  const { isDesktop, isMobile, isTablet } = useMediaQuery();
  const handleOpenOneInputModal = () => {
    openModal("AddTaskListModal", AddOrEditTaskListModal);
  };

  const handleDateSelect = (newDate: Date) => {
    onDateChange(newDate);
  };

  const handleModalDateSelect = (newDate: Date) => {
    onDateChange(newDate);
    closeModal();
  };

  const handleOpenCaldendarModal = () => {
    openModal("CalendarModal", CalendarModal, {
      onDateSelect: handleModalDateSelect,
      date,
    });
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
        {isMobile && (
          <IconCalenderBg className="cursor-pointer" onClick={handleOpenCaldendarModal} />
        )}
        {isTablet || isDesktop ? (
          <Popover>
            <Popover.Toggle>
              <IconCalenderBg className="cursor-pointer" />
            </Popover.Toggle>
            <Popover.Wrapper>
              <div className="w-282">
                <Calendar onDateSelect={handleDateSelect} selectedDate={date} />
              </div>
            </Popover.Wrapper>
          </Popover>
        ) : (
          <span />
        )}
      </div>
      <TextButton icon="plus" onClick={handleOpenOneInputModal}>
        새로운 목록 추가하기
      </TextButton>
    </div>
  );
}

function CalendarModal({
  onClose,
  onDateSelect,
  date,
}: {
  onClose?: () => void;
  onDateSelect?: (date: Date) => void;
  date?: Date;
}): React.ReactElement {
  const { isMobile } = useMediaQuery();

  return (
    <div>
      {isMobile && onDateSelect && date && (
        <Calendar onDateSelect={onDateSelect} selectedDate={date} />
      )}
    </div>
  );
}
