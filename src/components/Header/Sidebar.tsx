import { useEffect } from "react";
import { Membership } from "@coworkers-types";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// useRouter 추가
import useMediaQuery from "@hooks/useMediaQuery";
import { IconBoard, IconGroups, IconTamagotchi } from "@utils/icon";

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  groups,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  groups: Membership[] | undefined;
}) {
  const { isDesktop, isTablet } = useMediaQuery();
  const router = useRouter();
  const path = router.asPath;

  useEffect(() => {
    // 화면 크기가 Desktop 또는 Tablet으로 변경되면 사이드바를 닫음
    if ((isDesktop || isTablet) && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isDesktop, isTablet, sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    // sidebar가 열렸을 때 바깥쪽 scroll 중지
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#00000050] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={classNames(
          "fixed left-0 top-0 z-50 h-[100vh] w-184 bg-background-secondary p-16 transition-transform duration-300 md:hidden",
          {
            "translate-x-0 transform": sidebarOpen,
            "-translate-x-full transform": !sidebarOpen,
          }
        )}
      >
        <div className="mb-24 flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <IconTamagotchi className="mt-2" />
            <div className="mt-5 font-[SBAggroB] text-18 text-brand-primary">티마고치</div>
          </div>
          <button onClick={() => setSidebarOpen(false)}>
            <Image src="/icons/icon_close.svg" alt="사이드바 닫기 버튼" width={24} height={24} />
          </button>
        </div>
        <div className="flex h-[90%] flex-col gap-5 text-text-secondary">
          <hr className="h-1 border-0 bg-background-tertiary" />
          <Link
            href="/board"
            className={classNames(
              "flex items-center gap-5 rounded-8 px-8 py-12 text-md transition-all hover:bg-background-tertiary hover:text-text-primary",
              { "bg-background-tertiary text-text-primary": path === "/board" }
            )}
          >
            <IconBoard />
            자유게시판
          </Link>
          <Link
            href="/teams"
            className={classNames(
              "flex items-center gap-5 rounded-8 px-8 py-12 text-md transition-all hover:bg-background-tertiary hover:text-text-primary",
              { "bg-background-tertiary text-text-primary": path === "/teams" }
            )}
          >
            <IconGroups />팀 리스트
          </Link>
          <hr className="h-1 border-0 bg-background-tertiary" />
          {groups?.length ? <span className="mb-5 mt-10 text-xs font-bold">내 팀 목록</span> : null}
          <div className="flex flex-col gap-5 overflow-y-scroll">
            {groups?.map((group) => (
              <Link
                className={classNames(
                  "rounded-8 px-8 py-12 text-md transition-all hover:bg-background-tertiary hover:text-text-primary",
                  {
                    "bg-background-tertiary text-text-primary": path === `/teams/${group.groupId}`,
                  }
                )}
                href={`/teams/${group.groupId}`}
                key={group.groupId}
              >
                {group.group.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
