import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import ErrorMessages from "@constants/errorMessage";
import { postGroup } from "../pages/api/groupApi";
import { postImageURL } from "../pages/api/imageApi";

export function useAddTeamForm() {
  const [imgFile, setImgFile] = useState<string | File | null>(null);
  const [teamName, setTeamName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const router = useRouter();

  const handleFileChange = (value: string | File | null) => {
    setImgFile(value);
  };

  const handleTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const postGroupMutation = useMutation({
    mutationFn: ({ name, image }: { name: string; image: string | null }) => postGroup(name, image),
    onSuccess: () => {
      router.push("/team-list");
    },
    onError: () => {
      setNameErrorMessage(`${ErrorMessages.INVALID_TEAMNAME}`);
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

  useEffect(() => {
    if (imgFile && teamName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [imgFile, teamName]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imgFile || !teamName) return;

    if (imgFile instanceof File) {
      imagePostMutation.mutate(imgFile);
    } else {
      postGroupMutation.mutate({ name: teamName, image: imgFile });
    }
  };

  return {
    imgFile,
    teamName,
    disabled,
    nameErrorMessage,
    handleFileChange,
    handleTeamNameChange,
    handleSubmit,
    isPending,
  };
}
