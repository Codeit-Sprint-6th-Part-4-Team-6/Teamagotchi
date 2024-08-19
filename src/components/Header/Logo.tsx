import Link from "next/link";
import { IconEgg } from "@utils/icon";

export function Logo({ user }: { user: any }) {
  return (
    <Link href={user ? "/teams" : "/"} className="flex items-center justify-center">
      <IconEgg />
      <div className="font-bold text-brand-primary">Teamagotchi</div>
    </Link>
  );
}
