import { useEffect, useState } from "react";
import { UserGroup } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NameTag from "@components/commons/NameTag";
import Popover from "@components/commons/Popover";
import { useAuthStore } from "@store/useAuthStore";
import { clearAuth } from "@utils/auth";
import { IconToggle } from "@utils/icon";
import LOGO from "@images/logo.png";
import { getUserGroups } from "../../pages/api/userApi";

export default function Header() {
  const router = useRouter();
  const { pathname, query } = router;
  const { data: groups } = useQuery({
    queryKey: ["groups"],
    queryFn: getUserGroups,
  });
  const headerMenuTitle = () => {
    const filteredGroup = groups?.find((group) => group.id.toString() === query.teamId);
    return filteredGroup;
  };

  const [curTeamPage, setCurTeamPage] = useState<UserGroup | undefined>(headerMenuTitle);

  const { user, setUser } = useAuthStore();

  const handleSignOut = (): void => {
    alert("로그아웃 되었습니다.");
    setUser(null);
    clearAuth();
    router.push("/login");
  };

  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    setCurTeamPage(headerMenuTitle());
  }, [groups, query.teamId]);

  return (
    <header className="flex h-60 items-center justify-center border-b border-border-primary border-opacity-10 bg-background-secondary">
      <nav className="flex w-full max-w-full items-center justify-between px-10 md:min-w-696 md:max-w-1200 lg:max-w-1200">
        <Link href={user ? "/team-list" : "/"}>
          <Image src={LOGO} alt="코워커스 로고 이미지" className="w-102 md:w-158" priority />
        </Link>
        {!isAuthPage && (
          <>
            <div className="flex flex-grow items-center gap-10 px-20 text-lg">
              <Link href="/boards">자유게시판</Link>
              <Popover>
                <Popover.Toggle>
                  {curTeamPage?.name || "팀 리스트"} <IconToggle />
                </Popover.Toggle>
                <Popover.Wrapper>
                  {groups?.map((group) => (
                    <Popover.TeamItem
                      key={`group-${group.id}`}
                      title={group.name}
                      id={group.id}
                      imgSrc={group.image}
                    />
                  ))}
                  <Popover.InnerButton
                    onClick={() => {
                      router.push("/add-team");
                    }}
                  >
                    팀 추가하기
                  </Popover.InnerButton>
                </Popover.Wrapper>
              </Popover>
            </div>

            {user ? (
              <Popover>
                <Popover.Toggle>
                  <NameTag type="profile" name={user.nickname} image={user.image} />
                </Popover.Toggle>
                <Popover.Wrapper popDirection="left">
                  <Popover.Item onClick={() => {}}>마이 히스토리</Popover.Item>
                  <Popover.Item onClick={() => {}}>계정 설정</Popover.Item>
                  <Popover.Item onClick={() => {}}>팀 참여</Popover.Item>
                  <Popover.Item onClick={handleSignOut}>로그아웃</Popover.Item>
                </Popover.Wrapper>
              </Popover>
            ) : (
              <Link href="/login">로그인</Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
