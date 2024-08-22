import { ChangeEvent, useEffect, useRef, useState } from "react";

type UseImageInputProps = {
  defaultValue?: string | File;
};

export function useImageInput({ defaultValue }: UseImageInputProps) {
  const [value, setValue] = useState<File | string | null>(defaultValue ?? null);
  const [previewImage, setPreviewImage] = useState<string | File | null>(defaultValue ?? null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.files?.[0];
    if (nextValue) {
      setValue(nextValue);
    }
  };

  const handleClearClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setValue(null);
    setPreviewImage(null);
  };

  useEffect(() => {
    let objectUrl: string | null = null;

    if (value instanceof File) {
      objectUrl = URL.createObjectURL(value);
      setPreviewImage(objectUrl);
    } else if (typeof value === "string") {
      setPreviewImage(value);
    } else {
      setPreviewImage(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setPreviewImage(defaultValue);
    }
  }, [defaultValue]);

  return {
    value,
    previewImage,
    inputRef,
    handleClick,
    handleChange,
    handleClearClick,
    setValue,
  };
}
