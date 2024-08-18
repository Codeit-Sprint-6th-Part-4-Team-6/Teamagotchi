import { ChangeEvent, useState } from "react";
import { PostTaskRequest } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, setHours, setMinutes } from "date-fns";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import Textarea from "@components/commons/TextArea";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { postTask } from "@api/taskApi";
import FrequencyDropdown from "./FrequencyDropdown";
import SelectDateAndTime from "./SelectedTimeAndDate";
import WeeklyRepeatSelector from "./WeeklyRepeatSelector";

export default function CreateTaskModal({ onClose }: { onClose?: () => void }) {
  const { closeModal } = useModal();
  const { toast } = useToast();
  const router = useRouter();
  const { teamId, taskListsId } = router.query;

  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [selectedMonthDay, setSelectedMonthDay] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState("AM 9:00");
  const initialDate = setHours(setMinutes(new Date(), 0), 9);

  const queryClient = useQueryClient();

  const [task, setTask] = useState<PostTaskRequest>({
    name: "",
    description: "",
    startDate: format(initialDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    frequencyType: "",
  });

  const handleTaskStartTime = (date: Date, time: string) => {
    const [period, timeString] = time.split(" ");
    const [hours, minutes] = timeString.split(":");
    let hour = parseInt(hours, 10);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const localDate = new Date(date);
    localDate.setHours(hour, parseInt(minutes, 10));

    setTask((prevTask) => ({
      ...prevTask,
      startDate: format(localDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    }));
  };

  const handleTaskValues = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    if (name === "frequencyType" && value === "MONTHLY") {
      setSelectedMonthDay(selectedDate.getDate());
    }
  };

  const updateURL = (date: Date, id: string | string[] | undefined) => {
    const path = `/teams/${teamId}/task-lists/${id}`;
    const query = { date: date.toISOString().slice(0, 10) };

    router.push(
      {
        pathname: path,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleClick = () => {
    const submissionData = { ...task };
    if (task.frequencyType === "WEEKLY") {
      submissionData.weekDays = selectedWeekDays;
    } else if (task.frequencyType === "MONTHLY") {
      submissionData.monthDay = selectedMonthDay;
    }
    postTaskMutation.mutate(submissionData);
  };

  const postTaskMutation = useMutation({
    mutationFn: (data: PostTaskRequest) => postTask(teamId, taskListsId, data),
    onSuccess: () => {
      closeModal();
      updateURL(selectedDate, taskListsId);
      queryClient.invalidateQueries({ queryKey: ["taskLists"] });
    },
    onError: (error: any) => {
      toast("danger", `${error.response.data.message}`);
    },
  });

  return (
    <div className="box-border max-h-664 w-375 overflow-auto px-24 py-34 md:w-384">
      <form className="flex flex-col gap-16" action="submit">
        <Label className="text-center" content="할 일 만들기" />
        <div className="leading- mb-24 text-center text-14 font-medium text-text-default">
          할 일은 실제로 행동 가능한 작업 중심으로
          <br /> 작성해주시면 좋습니다.
        </div>
        <Label htmlFor="name" type="label" content="할 일 제목" />
        <Input
          id="name"
          name="name"
          placeholder="할 일 제목을 입력해주세요"
          onChange={handleTaskValues}
        />
        <Label htmlFor="startDate" type="label" content="시작 날짜 및 시간" />
        <SelectDateAndTime
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateChange={(date: Date) => {
            setSelectedDate(date);
            handleTaskStartTime(date, selectedTime);
          }}
          onTimeChange={(time: string) => {
            setSelectedTime(time);
            handleTaskStartTime(selectedDate, time);
          }}
        />
        <Label htmlFor="frequencyType" type="label" content="반복 설정" />
        <FrequencyDropdown
          selectedValue={task.frequencyType}
          onSelect={(value) => handleTaskValues({ target: { name: "frequencyType", value } })}
        />
        {task.frequencyType === "WEEKLY" && (
          <div>
            <Label htmlFor="name" type="label" content="반복 요일" marginBottom={16} />
            <WeeklyRepeatSelector selectedDays={selectedWeekDays} onChange={setSelectedWeekDays} />
          </div>
        )}
        <Label htmlFor="description" type="label" content="할 일 메모" />
        <Textarea
          id="description"
          name="description"
          type="small"
          placeholder="메모를 입력해주세요"
          onChange={handleTaskValues}
        />
        <Button onClick={handleClick} className="mt-16">
          만들기
        </Button>
      </form>
    </div>
  );
}
