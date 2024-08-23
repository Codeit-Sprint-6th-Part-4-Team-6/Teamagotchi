import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Group } from "@coworkers-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { getParams } from "@utils/getParams";
import { getGroup, postAcceptInvitation } from "@api/groupApi";
import ERROR_MESSAGES from "@constants/errorMessage";
import { urlPattern } from "@constants/urlPattern";
import { useToast } from "./useToast";

export const useJoinTeam = () => {
  const [value, setValue] = useState("");
  const [groupId, setGroupId] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [groupInfo, setGroupInfo] = useState<Group>();
  const { user } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const timer = useRef<number | null>(null);

  const {
    data: groupData,
    isFetching,
    isError,
    error,
  } = useQuery<Group, AxiosError>({
    queryKey: ["group", groupId],
    queryFn: () => getGroup(groupId),
    enabled,
    staleTime: 300000,
    retry: (failureCount, axiosError) => axiosError.response?.status === 404 && false,
  });

  const acceptInvitationMutation = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) =>
      postAcceptInvitation(email, token),
    onMutate: () => setIsDisabled(true),
    onSuccess: () => {
      toast("success", "그룹에 성공적으로 들어갑니다!");
      router.push({
        pathname: "/teams/[teamId]",
        query: { teamId: groupInfo?.id },
      });
    },
    onError: () => {
      toast("danger", "에러 발생");
    },
  });

  const checkLink = (link: string) => {
    try {
      const params = getParams(link);
      const token = params.get("token");
      const id = params.get("groupId");

      if (!token || !id) return 0;

      const base64Payload = token?.split(".")[1];

      if (!base64Payload) return 0;

      const payload = Buffer.from(base64Payload, "base64");

      const payloadObject: {
        groupId: number;
        scope: string;
        iat: number;
        exp: number;
        iss: string;
      } = JSON.parse(payload.toString());

      if (Number(id) === payloadObject.groupId && payloadObject.scope === "invitation") {
        return payloadObject.groupId;
      }

      return 0;
    } catch {
      return 0;
    }
  };

  const updatePreview = (url: string) => {
    if (!urlPattern.test(url)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_FORMAT);
      setEnabled(false);
      setGroupInfo(undefined);
      return;
    }

    setErrorMessage("");
    const idQuery = checkLink(url);

    if (!idQuery) {
      setErrorMessage(ERROR_MESSAGES.NON_EXISTENT_GROUP);
      setEnabled(false);
      setGroupInfo(undefined);
      return;
    }

    if (user?.memberships?.every((membership) => membership.groupId !== idQuery)) {
      setGroupId(idQuery);
      setEnabled(true);
      return;
    }

    setErrorMessage(ERROR_MESSAGES.ALREADY_MEMBER);
    setEnabled(false);
    setGroupInfo(undefined);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = getParams(value).get("token");

    if (!errorMessage && user && token) {
      acceptInvitationMutation.mutate({ email: user.email, token });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      updatePreview(event.target.value);
    }, 300);
  };

  useEffect(() => {
    if (router.isReady && router.query.token && router.query.groupId && user && !isError) {
      const initialUrl = process.env.NEXT_PUBLIC_SITE_URL + router.asPath;
      setValue(initialUrl);
      updatePreview(initialUrl);
    }
  }, [router.isReady, user, isError]);

  useEffect(() => {
    if (groupData && !isFetching && enabled) {
      setGroupInfo(groupData);
      setIsDisabled(false);
    }
  }, [groupData, isFetching, enabled]);

  useEffect(() => {
    if (isError && error.response?.status === 404) {
      setErrorMessage(ERROR_MESSAGES.NON_EXISTENT_GROUP);
    }
  }, [isError]);

  return {
    groupInfo,
    isFetching,
    errorMessage,
    value,
    handleChange,
    handleSubmit,
    isPending: acceptInvitationMutation.isPending,
    isDisabled,
  };
};
