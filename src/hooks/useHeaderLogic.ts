import { useEffect, useState } from "react";
import { Membership } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@hooks/auth/useAuth";
import { useAuthStore } from "@store/useAuthStore";
import { getUserMemberships } from "@api/userApi";

export function useHeaderLogic() {
  const { isLoggedIn, logout } = useAuth();
  const { user } = useAuthStore();
  const router = useRouter();
  const { pathname, query } = router;

  const { data: groups, isPending } = useQuery({
    queryKey: ["groups"],
    queryFn: getUserMemberships,
    enabled: !!user,
  });

  const getCurTeamPage = () => groups?.find((group) => group.groupId.toString() === query.teamId);

  const [curTeamPage, setCurTeamPage] = useState<Membership | undefined>(getCurTeamPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    setCurTeamPage(getCurTeamPage());
  }, [groups, query.teamId]);

  useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const handleSignOut = (): void => {
    alert("로그아웃 되었습니다.");
    logout();
  };

  return {
    isAuthPage,
    user,
    curTeamPage,
    groups,
    isPending,
    sidebarOpen,
    setSidebarOpen,
    handleSignOut,
  };
}
