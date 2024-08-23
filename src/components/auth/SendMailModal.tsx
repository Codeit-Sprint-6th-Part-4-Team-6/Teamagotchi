import { useState } from "react";
import { Message, SendResetPasswordRequest } from "@coworkers-types";
import { useMutation } from "@tanstack/react-query";
import OneInputModal from "@components/commons/modal/OneInputModal";
import { useToast } from "@hooks/useToast";
import { postSendResetPasswordEmail } from "@api/userApi";

export default function SendMailModal({ onClose }: { onClose?: () => void }) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const userData: SendResetPasswordRequest = {
    email,
    redirectUrl: String(process.env.NEXT_PUBLIC_SITE_URL),
  };

  const { mutate } = useMutation({
    mutationFn: (data: SendResetPasswordRequest) => postSendResetPasswordEmail(data),
    onSuccess: (response: Message) => {
      toast("success", response.message);
    },
    onError: (error: any) => {
      toast("danger", error.response.data.message);
    },
  });

  const handleSendMail = async () => {
    mutate(userData);
  };

  return (
    <OneInputModal
      title="비밀번호 재설정"
      content="비밀번호 재설정 링크를 보내드립니다."
      placeholder="이메일을 입력하세요."
      buttonText="링크 보내기"
      onConfirm={handleSendMail}
      onClose={onClose}
      onChange={handleChange}
      closeButton
    />
  );
}
