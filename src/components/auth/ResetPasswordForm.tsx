import { useState } from "react";
import { Password, ResetPassword } from "@coworkers-types";
import { useSearchParams } from "next/navigation";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import { postResetPassword } from "../../pages/api/userApi";

export default function ResetPasswordForm() {
  const [values, setValues] = useState<Password>({
    passwordConfirmation: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    const data: ResetPassword = {
      ...values,
      token: token || "",
    };

    const response = await postResetPassword(data);
    alert(response.message);
  };

  return (
    <form>
      <div className="mb-24">
        <Label type="label" content="새 비밀번호" htmlFor="password" marginBottom={12} />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함, 12자 이내)를 입력해주세요."
          errorMessage="비밀번호를 입력해주세요."
          onBlur={handleBlur}
        />
      </div>
      <div className="mb-40">
        <Label
          type="label"
          content="비밀번호 확인"
          htmlFor="passwordConfirmation"
          marginBottom={12}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함, 12자 이내)를 입력해주세요."
          errorMessage="비밀번호를 입력해주세요."
          onBlur={handleBlur}
        />
      </div>
      <Button buttonType="button" onClick={handleResetPassword}>
        재설정
      </Button>
    </form>
  );
}
