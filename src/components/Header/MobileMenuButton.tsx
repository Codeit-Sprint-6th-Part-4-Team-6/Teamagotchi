import { IconList } from "@utils/icon";

export function MobileMenuButton({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
  return (
    <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
      <IconList />
    </button>
  );
}
