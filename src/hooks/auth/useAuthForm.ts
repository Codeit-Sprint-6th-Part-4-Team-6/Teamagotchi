import { useState } from "react";
import { AuthSchema } from "@utils/schemas/auth";

export const useAuthForm = <T>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // 필드 유효성 검사
    const result = AuthSchema.safeParse({ [name]: value });
    if (!result.success) {
      const issue = result.error.issues.find((issues) => issues.path.includes(name));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: issue ? issue.message : undefined,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return {
    values,
    errors,
    handleBlur,
    handleChange,
    setValues,
  };
};
