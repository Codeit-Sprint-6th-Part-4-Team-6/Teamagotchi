import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconClose, IconEdit, IconImage, IconMemberLarge } from "@utils/icon";

type ImageInputProps = {
  name: string;
  value: File | Blob | string | null;
  type: "my-profile" | "team-profile" | "article";
  onChange: (name: string, value: File | null) => void;
  defaultValue?: string;
};

export default function ImageInput({ name, value, type, onChange, defaultValue }: ImageInputProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(defaultValue ?? null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.files?.[0];
    if (nextValue) {
      onChange(name, nextValue);
    }
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return undefined;
    const blob = typeof value === "string" ? new Blob([value], { type: "text/plain" }) : value;

    const nextPreview = URL.createObjectURL(blob);
    setPreviewImage(nextPreview);

    return () => {
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      <button type="button" className="relative flex" onClick={handleClick}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
        />

        {type !== "article" && (
          <div>
            <span className="flex">
              {type === "my-profile" ? <IconMemberLarge /> : <IconImage />}
              <span className="absolute">
                {previewImage && (
                  <PreviewImage
                    type={type}
                    src={previewImage}
                    handleImageDelete={handleClearClick}
                  />
                )}
              </span>
            </span>
            <IconEdit className="absolute bottom-0 right-0" />
          </div>
        )}
        {type === "article" && (
          <span className="flex">
            <div className="flex size-160 flex-col items-center justify-center gap-12 rounded-12 bg-background-secondary md:size-282">
              <div className="w-24 md:size-48">
                <Image
                  src="/icons/icon_plus_large.svg"
                  alt="plus"
                  width={24}
                  height={24}
                  layout="responsive"
                />
              </div>
              <span className="text-14 text-text-gray400 md:text-16">이미지 등록</span>
            </div>
            <span className="absolute">
              {previewImage && (
                <PreviewImage type={type} src={previewImage} handleImageDelete={handleClearClick} />
              )}
            </span>
          </span>
        )}
      </button>
    </div>
  );
}

type PreviewImageProps = {
  src: string;
  type?: "team-profile" | "my-profile" | "article";
  handleImageDelete?: () => void;
};

function PreviewImage({ src, type, handleImageDelete }: PreviewImageProps) {
  return (
    <div className="">
      {type !== "article" && (
        <div className="relative size-64">
          <Image
            src={src}
            layout="fill"
            className="relative rounded-full object-cover"
            onClick={handleImageDelete}
            alt="이미지 미리보기"
          />
        </div>
      )}
      {type === "article" && (
        <div className="relative size-160 md:size-282">
          <Image
            src={src}
            layout="fill"
            className="relative rounded-12 object-cover"
            alt="이미지 미리보기"
          />
          <IconClose
            alt="x"
            onClick={handleImageDelete}
            className="absolute right-66 top-60 stroke-text-secondary p-3 md:right-130 md:top-120"
          />
        </div>
      )}
    </div>
  );
}
