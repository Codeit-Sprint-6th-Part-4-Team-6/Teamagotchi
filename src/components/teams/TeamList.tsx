import React from "react";
import { Membership } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import LottieAnimation from "@components/commons/LottieAnimation";
import Spinner from "@components/commons/Spinner";
import { getUserMemberships } from "@api/userApi";
import TeamItem from "./TeamItem";

export default function TeamList() {
  const {
    data: teamList,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: getUserMemberships,
  });

  if (isPending) {
    return <Spinner className="pb-80 pt-180" />;
  }

  if (isError) {
    return <p className="text-red-500">{error.message}</p>;
  }

  return (
    <>
      {teamList && teamList.length !== 0 ? (
        <div className="md:min-h-200">
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {teamList.map((data: Membership) => (
              <TeamItem key={data.groupId} data={data} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-100">
          <LottieAnimation type="success" size={100} />
          <p className="mt-32 text-center text-14 text-text-default md:mt-48">
            아직 소속된 팀이 없습니다.
          </p>
          <p className="text-center text-14 text-text-default">
            팀을 생성하거나 팀에 참여해보세요.
          </p>
        </div>
      )}
    </>
  );
}
