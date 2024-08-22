import { ChangeEvent, useState } from "react";
import { PostTaskRequest } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import Success from "@components/commons/LottieAnimation/Success";
import Textarea from "@components/commons/TextArea";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { updateURL } from "@utils/updateUrl";
import { postTask } from "@api/taskApi";
import DateSelector from "./DateSelector";
import FrequencyDropdown from "./FrequencyDropdown";
import WeeklyRepeatSelector from "./WeeklyRepeatSelector";

export default function CreateTaskModal({ onClose }: { onClose?: () => void }) {
  const { closeModal } = useModal();
  const { toast } = useToast();
  const router = useRouter();
  const { teamId, taskListsId } = router.query;
  const queryClient = useQueryClient();

  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [selectedMonthDay, setSelectedMonthDay] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [task, setTask] = useState<PostTaskRequest>({
    name: "",
    description: "",
    startDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    frequencyType: "ONCE",
  });

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
      updateURL(selectedDate, taskListsId, teamId, router);
      queryClient.invalidateQueries({ queryKey: ["taskLists"] });
    },
    onError: (error: any) => {
      toast("danger", `${error.response.data.message}`);
    },
  });

  if (postTaskMutation.isPending) {
    return (
      <div className="flex size-300 flex-col items-center justify-center">
        <Success content="할 일을 생성중입니다." size={200} />
      </div>
    );
  }

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
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={(date: Date) => {
            setSelectedDate(date);
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
        <Button
          onClick={handleClick}
          className="mt-16"
          disabled={task.name.length < 1 || task.description.length < 1}
        >
          만들기
        </Button>
      </form>
    </div>
  );
}
