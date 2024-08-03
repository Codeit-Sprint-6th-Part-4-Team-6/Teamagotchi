import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";

export default function ResetPasswordForm() {
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
        />
      </div>
      <Button buttonType="button" size="large" onClick={() => {}}>
        재설정
      </Button>
    </form>
  );
}
