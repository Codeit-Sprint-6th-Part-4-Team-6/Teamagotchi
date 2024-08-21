import { useEffect, useState } from "react";
import { PostArticleRequest } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import Spinner from "@components/commons/Spinner";
import Textarea from "@components/commons/TextArea";
import useMediaQuery from "@hooks/useMediaQuery";
import { useToast } from "@hooks/useToast";
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
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [formValues, setFormValues] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState<string | File | null | undefined>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormValues({ title: initialData.title, content: initialData.content });
      setImageFile(initialData.image || null); // 초기 이미지 세팅
    }
  }, [initialData]);

  // 데이터 변경 감지 로직
  useEffect(() => {
    const isFormChanged = () => {
      // 제목, 내용 또는 이미지 변경 여부 확인
      const titleChanged = formValues.title !== (initialData?.title || "");
      const contentChanged = formValues.content !== (initialData?.content || "");
      const imageChanged =
        imageFile !== initialData?.image && !(imageFile === null && !initialData?.image);
      // 기존 이미지가 있었는데 삭제된 경우도 감지

      return titleChanged || contentChanged || imageChanged;
    };

    setHasChanges(isFormChanged());
  }, [formValues, imageFile, initialData]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (value: string | File | null) => {
    setImageFile(value); // 이미지 변경 시 업데이트
  };

  // 이미지 업로드를 위한 mutation
  const imageUploadMutation = useMutation({
    mutationFn: (image: string | File) => postImageURL(image),
  });

  // 게시글 등록을 위한 mutation
  const postArticleMutation = useMutation({
    mutationFn: (data: PostArticleRequest) => postArticle(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push(`/board/${data.id}`);
    },
    onError: () => {
      toast("warn", "게시글 등록 중 오류가 발생했습니다:");
    },
  });

  // 게시글 수정 mutation
  const updateArticleMutation = useMutation({
    mutationFn: (data: PostArticleRequest) => patchArticle(boardId as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push(`/board/${boardId}`);
    },
    onError: () => {
      toast("warn", "게시글 수정 중 오류가 발생했습니다:");
    },
  });

  const handleSubmit = async () => {
    try {
      let imageURL: string | null | undefined;

      if (imageFile && imageFile instanceof File) {
        const imageResponse = await imageUploadMutation.mutateAsync(imageFile);
        imageURL = imageResponse.url;
      }

      if (imageFile === null) {
        imageURL = null; // 이미지가 삭제된 경우
      }

      const articleData: PostArticleRequest = {
        title: formValues.title,
        content: formValues.content,
        image: imageURL,
      };

      if (boardId) {
        updateArticleMutation.mutate(articleData);
      } else {
        postArticleMutation.mutate(articleData);
      }
    } catch (error) {
      toast("warn", "게시글 등록 중 오류가 발생했습니다:");
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
            if (postValidation && hasChanges) handleSubmit();
          }}
        >
          <div className="flex items-center justify-between border-b-[1px] border-solid border-border-primary pb-30">
            <h1 className="text-xl font-bold">{boardId ? "게시글 수정" : "게시글 쓰기"}</h1>
            {isMobile ? null : (
              <Button
                size="medium"
                onClick={handleSubmit}
                disabled={!postValidation || !hasChanges}
              >
                {boardId ? "수정" : "등록"}
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
            <ImageInput
              id="Image"
              type="article"
              onChange={handleFileChange}
              defaultValue={initialData?.image}
            />
          </div>
          {isMobile ? (
            <div className="pt-10">
              <Button onClick={handleSubmit} disabled={!postValidation || !hasChanges}>
                {boardId ? "수정" : "등록"}
              </Button>
            </div>
          ) : null}
          <div />
        </form>
      )}
    </div>
  );
}
