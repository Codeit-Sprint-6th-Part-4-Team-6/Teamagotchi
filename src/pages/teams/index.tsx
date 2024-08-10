import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import TeamList from "@components/teams/TeamList";
import { useAuth } from "@hooks/auth/useAuth";

export default function TeamsPage() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <section className="flex flex-col items-center">
      <TeamList />

      <Button size="medium" className="mt-48 md:mt-80">
        <Link href="/add-team" className="h-full w-full leading-[48px]">
          팀 생성하기
        </Link>
      </Button>
      <Button buttonStyle="transparent" size="medium" className="mt-8 lg:mt-16">
        <Link href="/join-team" className="h-full w-full leading-[48px]">
          팀 참여하기
        </Link>
      </Button>

      <button type="button" onClick={logout}>
        로그아웃
      </button>
    </section>
  );
}
