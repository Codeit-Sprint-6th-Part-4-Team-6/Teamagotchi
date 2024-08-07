import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import ErrorMessages from "@constants/errorMessage";
import { postGroup } from "../../../pages/api/groupApi";
import { postImageURL } from "../../../pages/api/imageApi";

export default function AddTeamForm() {
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

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Label type="label" content="팀 프로필" htmlFor="team-profile" marginBottom={12} />
      <ImageInput id="imgFile" type="team-profile" onChange={handleFileChange} className="mb-24" />
      <Label type="label" content="팀 이름" htmlFor="team-name" marginBottom={12} />
      <Input
        value={teamName}
        id="team-name"
        type="text"
        placeholder="팀 이름을 입력해주세요"
        errorMessage={nameErrorMessage}
        onChange={handleTeamNameChange}
      />
      <Button className="mt-40" disabled={disabled} type="submit">
        생성하기
      </Button>
    </form>
  );
}
