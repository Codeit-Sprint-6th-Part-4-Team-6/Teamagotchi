import { useEffect, useState } from "react";
import { PostArticleRequest } from "@coworkers-types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import Spinner from "@components/commons/Spinner";
import Textarea from "@components/commons/TextArea";
import useMediaQuery from "@hooks/useMediaQuery";
import { patchArticle, postArticle } from "@api/articleApi";
import { postImageURL } from "@api/imageApi";

export default function BoardForm({
  boardId,
  initialData,
}: {
  boardId?: string | string[] | undefined;
  initialData?: { title: string; content: string; image?: string };
}) {
  const { isMobile } = useMediaQuery();
  const router = useRouter();
  const [formValues, setFormValues] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState<string | File | null | undefined>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormValues({ title: initialData.title, content: initialData.content });
      setImageFile(initialData.image || null);
      setIsEditing(true);
    }
  }, [initialData]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (value: string | File | null) => {
    setImageFile(value);
  };

  // 이미지 업로드를 위한 mutation
  const imageUploadMutation = useMutation({
    mutationFn: (image: string | File) => postImageURL(image),
  });

  // 게시글 등록을 위한 mutation
  const postArticleMutation = useMutation({
    mutationFn: (data: PostArticleRequest) => postArticle(data),
    onSuccess: (data) => {
      // invalidate query
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      console.error("게시글 등록 중 오류가 발생했습니다:", error);
    },
  });

  // 게시글 수정 mutation
  const updateArticleMutation = useMutation({
    mutationFn: (data: PostArticleRequest) => patchArticle(boardId, data),
    onSuccess: (data) => {
      router.push(`/board/${boardId}`);
    },
    onError: (error) => {
      console.error("게시글 수정 중 오류가 발생했습니다:", error);
    },
  });

  const handleSubmit = async () => {
    try {
      let imageURL: string | null = null;

      if (imageFile && imageFile instanceof File) {
        const imageResponse = await imageUploadMutation.mutateAsync(imageFile);
        imageURL = imageResponse.url; // 이미지 업로드 후 URL
      }

      const articleData: PostArticleRequest = {
        title: formValues.title,
        content: formValues.content,
        image: imageURL || undefined,
      };

      if (isEditing) {
        updateArticleMutation.mutate(articleData);
      } else {
        postArticleMutation.mutate(articleData);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const postValidation = !!(formValues.content.length && formValues.title.length);

  return (
    <div className="mx-auto mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
      {postArticleMutation.isPending || updateArticleMutation.isPending ? (
        <div className="flex h-[75vh] items-center justify-center">
          <Spinner size={100} />
        </div>
      ) : postArticleMutation.isSuccess || updateArticleMutation.isSuccess ? (
        <div className="flex h-[75vh] items-center justify-center">
          <Spinner size={100} />
        </div>
      ) : (
        <form
          className="flex flex-col gap-30"
          onSubmit={(event) => {
            event.preventDefault();
            if (postValidation) handleSubmit();
          }}
        >
          <div className="flex items-center justify-between border-b-[1px] border-solid border-border-primary pb-30">
            <h1 className="text-xl font-bold">{isEditing ? "게시글 수정" : "게시글 쓰기"}</h1>
            {isMobile ? null : (
              <Button size="medium" onClick={handleSubmit} disabled={!postValidation}>
                등록
              </Button>
            )}
          </div>

          <div>
            <Label type="essential" content="제목" marginBottom={12} htmlFor="title" />
            <Input
              id="title"
              value={formValues.title}
              onChange={handleTextChange}
              name="title"
              placeholder="제목을 입력해 주세요"
            />
          </div>
          <div>
            <Label type="essential" content="내용" marginBottom={12} htmlFor="content" />
            <Textarea
              id="content"
              value={formValues.content}
              onChange={handleTextChange}
              name="content"
              placeholder="내용을 입력해 주세요"
              type="big"
            />
          </div>
          <div>
            <Label content="이미지" marginBottom={12} />
            <ImageInput id="Image" type="article" onChange={handleFileChange} />
          </div>
          {isMobile ? (
            <div className="pt-10">
              <Button onClick={handleSubmit} disabled={!postValidation}>
                등록
              </Button>
            </div>
          ) : null}
          <div />
        </form>
      )}
    </div>
  );
}
