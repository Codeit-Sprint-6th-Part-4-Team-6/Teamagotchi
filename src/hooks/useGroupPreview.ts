import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Group } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getGroup } from "@api/groupApi";
import { urlPattern } from "@constants/urlPattern";
import { useToast } from "./useToast";

export const useGroupPreview = () => {
  const [value, setValue] = useState("");
  const [groupId, setGroupId] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [groupInfo, setGroupInfo] = useState<Group>();
  const { toast } = useToast();
  const router = useRouter();
  const timer = useRef<number | null>(null);

  const { data: groupData, isFetching } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroup(groupId),
    enabled,
    staleTime: 300000,
  });

  const checkLink = (link: string) => {
    try {
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
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
    } catch (error) {
      toast("danger", "Invalid Token Format");
      return 0;
    }
  };

  const updatePreview = (url: string) => {
    if (urlPattern.test(url)) {
      setErrorMessage("");
      const idQuery = checkLink(url);
      if (idQuery) {
        setGroupId(idQuery);
        setEnabled(true);
      } else {
        setErrorMessage("존재하지 않는 그룹 초대 링크입니다.");
        setEnabled(false);
        setGroupInfo(undefined);
      }
    } else {
      setErrorMessage("올바르지 않은 형식입니다.");
      setEnabled(false);
      setGroupInfo(undefined);
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
    if (router.isReady && router.query.token && router.query.groupId) {
      const initialUrl = process.env.NEXT_PUBLIC_SITE_URL + router.asPath;
      setValue(initialUrl);
      if (checkLink(initialUrl)) {
        setGroupId(Number(router.query.groupId));
        setEnabled(true);
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (groupData && !isFetching && enabled) {
      setGroupInfo(groupData);
    }
  }, [groupData, isFetching, enabled]);

  return { groupInfo, isFetching, errorMessage, value, handleChange };
};
