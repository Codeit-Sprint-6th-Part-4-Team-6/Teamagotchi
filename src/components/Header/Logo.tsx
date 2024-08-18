import Link from "next/link";

export function Logo({ user }: { user: any }) {
  return (
    <Link href={user ? "/teams" : "/"}>
      <div className="font-bold text-brand-primary">Teamagotchi</div>
    </Link>
  );
}
