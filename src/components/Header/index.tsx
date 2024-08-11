import Link from "next/link";
import { useHeaderLogic } from "@hooks/useHeaderLogic";
import { DesktopNavigation } from "./DesktopNavigation";
import { Logo } from "./Logo";
import { MobileMenuButton } from "./MobileMenuButton";
import { Sidebar } from "./Sidebar";
import { UserPopoverMenu } from "./UserPopoverMenu";

export default function Header() {
  const {
    isAuthPage,
    isRendingPage,
    user,
    curTeamPage,
    groups,
    isPending,
    sidebarOpen,
    setSidebarOpen,
    handleSignOut,
  } = useHeaderLogic();

  return (
    <header className="relative flex h-60 items-center justify-center border-b border-border-primary border-opacity-10 bg-background-secondary">
      <nav className="flex w-full max-w-full items-center justify-between px-10 md:min-w-696 md:max-w-1200">
        <div className="flex gap-10">
          <MobileMenuButton setSidebarOpen={setSidebarOpen} />
          <Logo user={user} />
        </div>
        {!isAuthPage && user && (
          <>
            <DesktopNavigation curTeamPage={curTeamPage} groups={groups} isPending={isPending} />
            <UserPopoverMenu user={user} handleSignOut={handleSignOut} />
          </>
        )}
        {isRendingPage && <Link href="/login">로그인</Link>}
      </nav>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} groups={groups} />
    </header>
  );
}
