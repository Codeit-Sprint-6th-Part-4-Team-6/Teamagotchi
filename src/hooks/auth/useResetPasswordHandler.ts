import { Password, ResetPassword } from "@coworkers-types";
import { useSearchParams } from "next/navigation";
import { postResetPassword } from "../../pages/api/userApi";

export const useResetPasswordHandler = (values: Password) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async () => {
    const data: ResetPassword = {
      ...values,
      token: token || "",
    };

    const response = await postResetPassword(data);
    alert(response.message);
  };

  return {
    handleResetPassword,
  };
};
