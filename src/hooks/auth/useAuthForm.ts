import { useState } from "react";

export const useAuthForm = <T>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return {
    values,
    handleBlur,
    setValues,
  };
};
