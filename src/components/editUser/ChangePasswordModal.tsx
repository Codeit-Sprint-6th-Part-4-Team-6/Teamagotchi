import { Password } from "@coworkers-types";
import { useMutation } from "@tanstack/react-query";
import TwoInputModal from "@components/commons/modal/TwoInputModal";
import { useAuthForm } from "@hooks/auth/useAuthForm";
import { useToast } from "@hooks/useToast";
import { ResetPasswordSchema } from "@utils/schemas/auth";
import { patchResetPassword } from "@api/userApi";

const initialPasswordState: Password = {
  password: "",
  passwordConfirmation: "",
};

export default function ChangePasswordModal({ onClose }: { onClose?: () => void }) {
  const { values, errors, isValid, handleChange } = useAuthForm<Password>(
    initialPasswordState,
    ResetPasswordSchema
  );
  const { toast } = useToast();

  const patchPasswordMutation = useMutation({
    mutationFn: (value: Password) => patchResetPassword(value),
    onSuccess: () => {
      // TODO: 토스트
      toast("success", "비밀번호 변경에 성공했습니다.");
    },
    onError: () => {
      toast("danger", "비밀번호 변경에 실패했습니다.");
    },
  });

  const changeOnConfirm = () => {
    patchPasswordMutation.mutate(values);
  };

  return (
    <TwoInputModal
      title="비밀번호 변경하기"
      firstTitle="새 비밀번호"
      firstPlaceholder="새 비밀번호를 입력해주세요."
      secondTitle="새 비밀번호 확인"
      secondPlaceholder="새 비밀번호를 다시 한 번 입력해주세요."
      buttonText="변경하기"
      onConfirm={changeOnConfirm}
      onClose={onClose}
      firstOnChange={handleChange}
      secondOnChange={handleChange}
      closeButton
      firstInputType="password"
      secondInputType="password"
      firstInputName="password"
      secondInputName="passwordConfirmation"
      firstInputErrorMessage={errors.password}
      secondInputErrorMessage={errors.passwordConfirmation}
      disabled={!isValid}
    />
  );
}
