import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { z } from "zod";
import { useToast } from "@hooks/useToast";
import { validateImage } from "@utils/validateImage";
import { postImageURL } from "@api/imageApi";

interface UseUpdateFormProps {
  initialName?: string;
  initialImage?: File | string | null;
  onSubmit?: (data: { [key: string]: any }, id?: number) => Promise<unknown>;
  successMessage: string;
  redirectPath?: string;
  query?: string | string[];
  nameKey?: string;
  requestId?: number;
}

export function useUpdateForm({
  initialName,
  initialImage = "",
  onSubmit,
  successMessage,
  redirectPath,
  query,
  nameKey = "name",
  requestId,
}: UseUpdateFormProps) {
  const [imageFile, setImageFile] = useState<string | File | null>(initialImage);
  const [changedName, setChangedName] = useState(initialName);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const schema = z
    .string()
    .max(10, "닉네임은 최대 10자까지 가능합니다.")
    .regex(/\S+/g, "닉네임에 공백 문자는 포함될 수 없습니다.")
    .trim();

  const handleFileChange = (value: string | File | null) => {
    setImageFile(value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedName(event.target.value);
  };

  let errorMessage: string = "";

  if (nameKey === "nickname") {
    const result = schema.safeParse(changedName);
    if (!result.success) {
      errorMessage = result.error.issues[0].message;
    }
  }

  const mutation = useMutation({
    mutationFn: async (variables: { data: { [key: string]: any }; id?: number }) => {
      if (onSubmit) {
        await onSubmit(variables.data, variables.id);
      }
    },
    onSuccess: () => {
      if (query) {
        if (typeof query === "string") {
          queryClient.invalidateQueries({ queryKey: [query] });
        } else if (Array.isArray(query)) {
          query.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: [key] });
          });
        }
      }
      if (successMessage) {
        toast("success", successMessage);
      }
      if (redirectPath) {
        router.push(redirectPath);
      }
    },
    onError: () => {
      toast("danger", "계정 설정에 실패했습니다.");
    },
  });

  const imagePostMutation = useMutation({
    mutationFn: (file: File) => postImageURL(file),
    onSuccess: (data: { url: string }) => {
      const mutationData: { [key: string]: any } = {};

      if (changedName !== initialName) {
        mutationData[nameKey] = changedName;
      }

      if (!imageFile) {
        mutationData["image"] = null;
      } else {
        mutationData["image"] = validateImage(data.url) ? data.url : "";
      }

      mutation.mutate({ data: mutationData, id: requestId });
    },
    onError: (error: any) => {
      toast("warn", `Error uploading image: ${error}`);
    },
  });

  const isPending = mutation.isPending || imagePostMutation.isPending;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameKey === "nickname" && errorMessage) {
      return; // 유효성 검사를 통과하지 못하면 제출하지 않음
    }
    if (imageFile instanceof File) {
      imagePostMutation.mutate(imageFile);
    } else {
      const mutationData: { [key: string]: any } = {};

      if (changedName !== initialName) {
        mutationData[nameKey] = changedName;
      }

      if (!imageFile && initialImage) {
        mutationData["image"] = "";
      } else if (typeof imageFile === "string" && imageFile !== initialImage) {
        mutationData["image"] = validateImage(imageFile) ? imageFile : "";
      }

      mutation.mutate({ data: mutationData, id: requestId });
    }
  };

  return {
    imageFile,
    changedName,
    errorMessage,
    handleFileChange,
    handleNameChange,
    handleSubmit,
    isPending,
  };
}
