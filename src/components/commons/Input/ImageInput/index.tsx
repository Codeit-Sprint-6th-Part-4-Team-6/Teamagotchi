import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { IconClose, IconEdit, IconImage, IconMemberLarge } from "@utils/icon";
import { postImageURL } from "../../../../pages/api/imageApi";

type ImageInputProps = {
  id: string;
  value: File | Blob | string | null;
  type: "my-profile" | "team-profile" | "article";
  onChange: (value: string | null) => void;
  errorMessage: string;
  defaultValue?: string;
  className?: string;
};

/**
 * 이미지를 넣을 수 있는 file input 입니다. value 값을 링크로 변환시켜줍니다.
 * @param id - input의 id입니다.
 * @param type - 'my-profile' / 'team' / 'article' 중 필요한 것 골라서 쓰세요.
 * @param onChange - input의 handleChange 함수를 넣어주세요.
 * @param errorMessage - 에러 상태 메세지를 넣어주세요.
 * @param defaultValue - input에 기본 이미지 파일이 있을 경우 넣어주세요. (수정하기 페이지용)
 * @param className - 추가적인 css를 작성해주세요.
 * @returns
 */
export default function ImageInput({
  id,
  value,
  type,
  onChange,
  errorMessage,
  defaultValue,
  className,
}: ImageInputProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(defaultValue ?? null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const mutation = useMutation({
    mutationFn: (file: File) => postImageURL(file),
    onSuccess: (data) => {
      onChange(data.url);
      setPreviewImage(data.url);
    },
    onError: (error) => {
      alert(`Error uploading image: ${error}`);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.files?.[0];
    if (nextValue) {
      mutation.mutate(nextValue);
    }
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(null);
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

  return (
    <div className={className}>
      <button type="button" className="relative flex" onClick={handleClick}>
        <input
          id={id}
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
                {mutation.status === "pending" && (
                  <span className="absolute flex size-64 items-center justify-center rounded-full border-2 border-solid border-border-primary bg-background-secondary">
                    로딩스피너
                  </span>
                )}
              </span>
            </span>
            <IconEdit className="absolute bottom-0 right-0" />
          </div>
        )}
        {type === "article" && (
          <span className="flex">
            <div className="flex size-160 flex-col items-center justify-center gap-12 rounded-12 bg-background-secondary md:size-282">
              <div className="w-24 md:w-48">
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
            {mutation.status === "pending" && (
              <div className="absolute flex size-160 flex-col items-center justify-center gap-12 rounded-12 bg-background-secondary md:size-282">
                로딩스피너
              </div>
            )}
          </span>
        )}
      </button>
      {errorMessage && value === null && (
        <p className="mt-8 text-md font-medium text-status-danger">{errorMessage}</p>
      )}
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
    <>
      {type !== "article" && (
        <div className="relative size-64">
          <Image
            src={src}
            fill
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
            fill
            className="relative rounded-12 object-cover"
            onClick={handleImageDelete}
            alt="이미지 미리보기"
          />
          <IconClose
            alt="x"
            className="absolute right-6 top-6 stroke-text-secondary p-3 md:right-12 md:top-12"
            onClick={handleImageDelete}
          />
        </div>
      )}
    </>
  );
}
