import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useToast } from "@hooks/useToast";
import { postImageURL } from "@api/imageApi";

interface UseUpdateFormProps {
  initialName: string;
  initialImage?: File | string | null;
  onSubmit?: (data: { [key: string]: any }, id?: number) => Promise<unknown>;
  successMessage: string;
  redirectPath?: string;
  query?: string;
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
    mutationFn: async (variables: { data: { [key: string]: any }; id?: number }) => {
      if (onSubmit) {
        await onSubmit(variables.data, variables.id);
      }
    },
    onSuccess: () => {
      if (query) {
        queryClient.invalidateQueries({ queryKey: [query] });
      }
      if (successMessage) {
        toast("success", successMessage);
      }
      if (redirectPath) {
        router.push(redirectPath);
      }
      setErrorMessage("");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message;
      setErrorMessage(message);
      toast("danger", message);
    },
  });

  const imagePostMutation = useMutation({
    mutationFn: (file: File) => postImageURL(file),
    onSuccess: (data: { url: string }) => {
      const mutationData: { [key: string]: any } = {};

      if (changedName !== initialName) {
        mutationData[nameKey] = changedName;
      }

      mutationData["image"] = data.url;

      if (requestId) {
        mutation.mutate({ data: mutationData, id: requestId });
      } else {
        mutation.mutate({ data: mutationData });
      }
    },
    onError: (error: any) => {
      toast("warn", `Error uploading image: ${error}`);
    },
  });

  const isPending = mutation.isPending || imagePostMutation.isPending;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (imageFile instanceof File) {
      imagePostMutation.mutate(imageFile);
    } else {
      const mutationData: { [key: string]: any } = {};

      if (changedName !== initialName) {
        mutationData[nameKey] = changedName;
      }

      if (imageFile === "") {
        mutationData["image"] = null;
      } else if (typeof imageFile === "string") {
        mutationData["image"] = imageFile;
      }

      if (requestId) {
        mutation.mutate({ data: mutationData, id: requestId });
      } else {
        mutation.mutate({ data: mutationData });
      }
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
