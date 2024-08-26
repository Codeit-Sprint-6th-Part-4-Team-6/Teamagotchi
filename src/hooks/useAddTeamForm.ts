import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postGroup } from "@api/groupApi";
import { postImageURL } from "@api/imageApi";
import { useToast } from "./useToast";

export function useAddTeamForm() {
  const [imageFile, setImageFile] = useState<string | File | null>(null);
  const [teamName, setTeamName] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleFileChange = (value: string | File | null) => {
    setImageFile(value);
  };

  const handleTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const postGroupMutation = useMutation({
    mutationFn: ({ name, image }: { name: string; image?: string }) => postGroup({ name, image }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/teams");
      toast("success", "팀 생성에 성공했습니다.");
    },
    onError: (error: any) => {
      const message = error.response.data?.message;
      setNameErrorMessage(message);
    },
  });

  const imagePostMutation = useMutation({
    mutationFn: (file: File) => postImageURL(file),
    onSuccess: (data: { url: string }) => {
      postGroupMutation.mutate({ name: teamName, image: data.url });
    },
    onError: (error: any) => {
      toast("danger", `Error uploading image: ${error}`);
    },
  });

  const isPending = postGroupMutation.isPending || imagePostMutation.isPending;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!teamName) return;

    if (imageFile instanceof File) {
      imagePostMutation.mutate(imageFile);
    } else {
      postGroupMutation.mutate({ name: teamName });
    }
  };

  return {
    imageFile,
    teamName,
    nameErrorMessage,
    handleFileChange,
    handleTeamNameChange,
    handleSubmit,
    isPending,
  };
}
