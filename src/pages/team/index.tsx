import Link from "next/link";
import Button from "@components/commons/Button";
import TeamList from "@components/team-list/TeamList";

export default function TeamListPage() {
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
    </section>
  );
}