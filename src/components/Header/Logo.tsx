import Image from "next/image";
import Link from "next/link";
import LOGO from "@images/logo.png";

export function Logo({ user }: { user: any }) {
  return (
    <Link href={user ? "/teams" : "/"}>
      <Image src={LOGO} alt="코워커스 로고 이미지" className="w-102 md:w-158" priority />
    </Link>
  );
}
