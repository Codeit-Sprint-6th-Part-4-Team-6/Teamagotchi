import { ChangeEvent, useState } from "react";
import { DateTask, PatchTaskRequest } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import Textarea from "@components/commons/TextArea";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { patchTaskCompletionStatus } from "@api/taskApi";

export default function EditTaskModal({
  onClose,
  defaultValue,
}: {
  onClose?: () => void;
  defaultValue?: DateTask;
}) {
  const { toast } = useToast();
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { teamId, taskListsId } = router.query;
  const [name, setName] = useState(defaultValue?.name as string);
  const [description, setDescription] = useState(defaultValue?.description as string);

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const patchTaskMutation = useMutation({
    mutationFn: (data: PatchTaskRequest) =>
      patchTaskCompletionStatus(teamId, taskListsId, Number(defaultValue?.id), data),
    onSuccess: () => {
      toast("success", "할 일을 수정했습니다.");
      queryClient.invalidateQueries({ queryKey: ["taskLists"] });
      closeModal();
    },
    onError: (error: any) => {
      toast("danger", `${error.response.data.message}`);
    },
  });

  return (
    <div className="box-border w-375 overflow-auto px-24 py-34 md:w-384">
      <form className="flex flex-col gap-16" action="submit">
        <Label content="할 일 수정하기" className="text-center" />
        <div className="mb-8 text-center text-14 font-medium text-text-secondary">
          해야할 일의 이름과 내용을 수정할 수 있습니다.
        </div>
        <Label type="label" content="할 일 이름" />
        <Input value={name} onChange={handleName} />
        <Label type="label" content="할 일 내용" />
        <Textarea value={description} onChange={handleDescription} type="small" />
        <div className="mt-16 flex gap-8">
          <Button onClick={onClose} buttonStyle="outlined-secondary">
            닫기
          </Button>
          <Button
            onClick={() => {
              patchTaskMutation.mutate({ name, description });
            }}
          >
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
}
