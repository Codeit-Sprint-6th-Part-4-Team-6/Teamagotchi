import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useToast } from "@hooks/useToast";
import { postImageURL } from "@api/imageApi";

interface UseUploadFormProps {
  initialName?: string;
  initialImage?: string | File | null;
  onSubmit: (data: { name: string; image?: string }) => Promise<any>;
  successMessage: string;
  redirectPath?: string;
  queryKey?: string;
}

export function useUploadForm({
  initialName,
  initialImage = null,
  onSubmit,
  successMessage,
  redirectPath,
  queryKey,
}: UseUploadFormProps) {
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
    mutationFn: ({ name, image }: { name: string; image?: string }) => onSubmit({ name, image }),
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
      const message = error.response.data?.message;
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!changedName) return;

    if (imageFile instanceof File) {
      imagePostMutation.mutate(imageFile);
    } else {
      mutation.mutate({ name: changedName });
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
