import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInvitationToken } from "@api/groupApi";
import { useToast } from "./useToast";

export const useInvitation = (groupId: number) => {
  const [enabled, setEnabled] = useState(false);
  const { toast } = useToast();

  const { data: token, isFetching } = useQuery({
    queryKey: ["invitationToken", groupId],
    queryFn: () => getInvitationToken(groupId),
    enabled,
    staleTime: 300000,
  });

  const handleCopyClick = () => {
    setEnabled(true);
  };

  const createLink = async (invitationToken: string) => {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/join-team?token=${invitationToken}&groupId=${groupId}`;
    await navigator.clipboard.writeText(url);
    toast("success", "그룹 초대 링크가 복사되었습니다.");
    setEnabled(false);
  };

  useEffect(() => {
    if (token && enabled && !isFetching) {
      createLink(token);
    }
  }, [token, enabled, isFetching]);

  return { handleCopyClick };
};
