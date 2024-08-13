import { useState } from "react";
import { ZodSchema } from "zod";

export const useAuthForm = <T>(initialState: T, schema: ZodSchema) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isValid, setIsValid] = useState(false);

  // handleChange에서 상태 업데이트와 유효성 검사를 모두 수행
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const result = schema.safeParse({
      ...values,
      [name]: value, // 업데이트된 값으로 검증
    });

    if (!result.success) {
      const issue = result.error.issues.find((issueData) => issueData.path.includes(name));
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
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
  };
};
