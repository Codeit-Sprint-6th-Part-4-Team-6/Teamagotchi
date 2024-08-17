import { Message, Password, ResetPassword } from "@coworkers-types";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useToast } from "@hooks/useToast";
import { postResetPassword } from "@api/userApi";

export const useResetPasswordHandler = (values: Password) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();

  const userData: ResetPassword = {
    ...values,
    token: token || "",
  };

  const { mutate } = useMutation({
    mutationFn: (passwordData: ResetPassword) => postResetPassword(passwordData),
    onSuccess: (response: Message) => {
      toast("success", response.message);
    },
    onError: (error: any) => {
      toast("danger", error.response.data.message);
    },
  });

  const handleResetPassword = async () => {
    mutate(userData);
  };

  return {
    handleResetPassword,
  };
};
