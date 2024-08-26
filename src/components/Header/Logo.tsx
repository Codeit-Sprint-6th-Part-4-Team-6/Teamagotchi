import Link from "next/link";
import { IconTamagotchi } from "@utils/icon";

export function Logo({ user }: { user: any }) {
  return (
    <Link href={user ? "/teams" : "/"} className="flex items-center justify-center gap-4">
      <IconTamagotchi />
      <div className="pt-3 font-[SBAggroB] text-18 text-brand-primary">티마고치</div>
    </Link>
  );
}
