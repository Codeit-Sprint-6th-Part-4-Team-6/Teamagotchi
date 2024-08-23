import { useEffect } from "react";
import Image from "next/image";
import { useImageInput } from "@hooks/useImageInput";
import { IconClose, IconEdit, IconMemberLarge } from "@utils/icon";
import TeamDefault from "../TeamDefault";

type ImageInputProps = {
  id: string;
  type: "my-profile" | "team-profile" | "article";
  onChange: (value: string | File | null) => void;
  defaultValue?: string | File;
  className?: string;
};

/**
 * 이미지를 넣을 수 있는 file input 입니다. value 값을 링크로 변환시켜줍니다.
 * @param id - input의 id입니다.
 * @param type - 'my-profile' / 'team-profile' / 'article' 중 필요한 것 골라서 쓰세요.
 * @param onChange - input의 handleChange 함수를 넣어주세요.
 * @param defaultValue - input에 기본 이미지 파일이 있을 경우 넣어주세요. (수정하기 페이지용)
 * @param className - 추가적인 css를 작성해주세요.
 * @returns 이미지 인풋이 렌더링됩니다.
 */
export default function ImageInput({
  id,
  type,
  onChange,
  defaultValue,
  className,
}: ImageInputProps) {
  const { value, previewImage, inputRef, handleClick, handleChange, handleClearClick } =
    useImageInput({ defaultValue });

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);
  return (
    <div className={className}>
      <button type="button" className="relative flex flex-col" onClick={handleClick}>
        <input
          id={id}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
        />
        {type !== "article" && (
          <span className="relative flex">
            {type === "my-profile" ? <IconMemberLarge /> : <TeamDefault type="edit" />}
            <span className="absolute">
              {previewImage && (
                <PreviewImage
                  type={type}
                  src={previewImage instanceof File ? "" : previewImage}
                  handleImageDelete={handleClearClick}
                />
              )}
            </span>
            <IconEdit className="absolute bottom-0 right-0" />
          </span>
        )}
        {type === "article" && (
          <div className="flex">
            <div className="flex size-160 flex-col items-center justify-center gap-12 rounded-12 border border-solid border-border-primary/10 bg-background-secondary md:size-282">
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
                <PreviewImage
                  type={type}
                  src={previewImage instanceof File ? "" : previewImage}
                  handleImageDelete={handleClearClick}
                />
              )}
            </span>
          </div>
        )}
      </button>
    </div>
  );
}

// 이미지 미리보기 컴포넌트
type PreviewImageProps = {
  src: string;
  type?: "team-profile" | "my-profile" | "article";
  handleImageDelete: () => void;
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
          <IconClose
            className="absolute -right-10 -top-6 rounded-5 transition-all hover:bg-background-tertiary"
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              handleImageDelete();
            }}
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
            className="absolute right-6 top-6 rounded-5 transition-all hover:bg-background-tertiary md:right-12 md:top-12"
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              handleImageDelete();
            }}
          />
        </div>
      )}
    </>
  );
}
