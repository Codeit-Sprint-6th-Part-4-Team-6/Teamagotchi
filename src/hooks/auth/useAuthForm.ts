import { useState } from "react";
import { ZodSchema } from "zod";

export const useAuthForm = <T>(initialState: T, schema: ZodSchema) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const result = schema.safeParse({
      ...values,
      [name]: value,
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
