import { useState } from "react";
import { AuthSchema } from "@utils/schemas/auth";

export const useAuthForm = <T>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isValid, setIsValid] = useState(false);

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const result = AuthSchema.safeParse(values);
    if (!result.success) {
      const issue = result.error.issues.find((issues) => issues.path.includes(name));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: issue ? issue.message : undefined,
      }));
      setIsValid(false);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
      setIsValid(true);
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
    isValid,
    handleBlur,
    handleChange,
    setValues,
  };
};
