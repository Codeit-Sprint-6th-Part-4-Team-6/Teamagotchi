import { ChangeEvent, FormEvent, useState } from "react";
import { GroupInfo, Profile } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useToast } from "@hooks/useToast";
import { postImageURL } from "@api/imageApi";

interface UseUpdateFormProps {
  initialName: string;
  initialImage?: string | null;
  onSubmit?: (data: { name: string; image?: string }) => Promise<any>;
  onEditSubmit?: (id: number, data: Profile) => Promise<GroupInfo>;
  successMessage: string;
  redirectPath?: string;
  queryKey?: string;
}

export function useUpdateForm({
  initialName,
  initialImage = null,
  onSubmit,
  onEditSubmit,
  successMessage,
  redirectPath,
  queryKey,
}: UseUpdateFormProps) {
  const [imageFile, setImageFile] = useState<string | File | null>(initialImage);
  const [changedName, setChangedName] = useState(initialName);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleFileChange = (value: string | File | null) => {
    setImageFile(value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedName(event.target.value);
  };

  const mutation = useMutation({
    mutationFn: ({ id, name, image }: { id?: number; name: string; image?: string }) => {
      if (id !== undefined && onEditSubmit) {
        return onEditSubmit(id, { name, image });
      }
      if (onSubmit) {
        return onSubmit({ name, image });
      }
      throw new Error("onSubmit 또는 onEditSubmit이 정의되지 않았습니다.");
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
      if (successMessage) {
        toast("success", successMessage);
      }
      if (redirectPath) {
        router.push(redirectPath);
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "An error occurred";
      setErrorMessage(message);
    },
  });

  const imagePostMutation = useMutation({
    mutationFn: (file: File) => postImageURL(file),
    onSuccess: (data: { url: string }) => {
      mutation.mutate({ name: changedName ?? "", image: data.url });
    },
    onError: (error: any) => {
      toast("warn", `Error uploading image: ${error}`);
    },
  });

  const isPending = mutation.isPending || imagePostMutation.isPending;

  const handleSubmit = (event: FormEvent<HTMLFormElement>, id?: number) => {
    event.preventDefault();
    if (!changedName) return;

    if (imageFile instanceof File) {
      imagePostMutation.mutate(imageFile);
    } else {
      mutation.mutate({ id, name: changedName });
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
