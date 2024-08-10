import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postGroup } from "@api/groupApi";
import { postImageURL } from "@api/imageApi";

export function useAddTeamForm() {
  const [imageFile, setImageFile] = useState<string | File | null>(null);
  const [teamName, setTeamName] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const router = useRouter();

  const handleFileChange = (value: string | File | null) => {
    setImageFile(value);
  };

  const handleTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const postGroupMutation = useMutation({
    mutationFn: ({ name, image }: { name: string; image?: string }) => postGroup({ name, image }),
    onSuccess: () => {
      router.push("/teams");
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
      alert(`Error uploading image: ${error}`);
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
