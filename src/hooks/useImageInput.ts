import { ChangeEvent, useEffect, useRef, useState } from "react";

type UseImageInputProps = {
  defaultValue?: string;
};

export function useImageInput({ defaultValue }: UseImageInputProps) {
  const [value, setValue] = useState<File | string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(defaultValue ?? null);
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
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    setValue(null);
    setPreviewImage(null);
  };

  useEffect(() => {
    let objectUrl: string | null = null;

    if (!value) {
      setPreviewImage(null);
    } else if (typeof value === "string") {
      setPreviewImage(value);
    } else {
      objectUrl = URL.createObjectURL(value);
      setPreviewImage(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [value]);

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
