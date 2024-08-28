import React from "react";
import { Membership, User } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import ErrorBoundary from "@components/commons/ErrorBoundary";
import LottieAnimation from "@components/commons/LottieAnimation";
import TeamItem from "./TeamItem";

export default function TeamList() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>(["user"]);
  const teamList = userData?.memberships;

  return (
    <>
      <ErrorBoundary queryKey={{ queryKey: ["groups"] }}>
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
      </ErrorBoundary>
    </>
  );
}
