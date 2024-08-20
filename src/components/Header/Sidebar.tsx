import { useEffect } from "react";
import { Membership } from "@coworkers-types";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@hooks/useMediaQuery";

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
          "fixed left-0 top-0 z-50 h-[100vh] w-204 bg-background-tertiary p-16 transition-transform duration-300 md:hidden",
          {
            "translate-x-0 transform": sidebarOpen,
            "-translate-x-full transform": !sidebarOpen,
          }
        )}
      >
        <div className="mb-24 flex w-full justify-end">
          <button onClick={() => setSidebarOpen(false)}>
            <Image src="/icons/icon_close.svg" alt="사이드바 닫기 버튼" width={24} height={24} />
          </button>
        </div>
        <div className="flex flex-col gap-24">
          <Link href="/board" className="text-md">
            자유게시판
          </Link>
          <Link href="/teams" className="text-md">
            팀 리스트
          </Link>
          {groups?.map((group) => (
            <Link className="text-md" href={`/teams/${group.groupId}`} key={group.groupId}>
              {group.group.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
