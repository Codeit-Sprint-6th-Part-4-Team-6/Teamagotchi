import { useState } from "react";
import { SendResetPasswordRequest } from "@coworkers-types";
import OneInputModal from "@components/commons/modal/OneInputModal";
import { postSendResetPasswordEmail } from "@api/userApi";

export default function SendMailModal({ onClose }: { onClose?: () => void }) {
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSendMail = async () => {
    const data: SendResetPasswordRequest = {
      email,
      // NOTE: 배포 후에 Url 변경 필요.
      redirectUrl: "http://localhost:3000",
    };

    const response = await postSendResetPasswordEmail(data);
    alert(response.message);
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
