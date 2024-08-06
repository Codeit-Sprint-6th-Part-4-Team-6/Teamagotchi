import React from "react";
import { Membership } from "@coworkers-types";
import Spinner from "@components/commons/Spinner";
import { useFetchData } from "@hooks/useFetchData";
import { getUserMemberships } from "../../pages/api/userApi";
import TeamItem from "./TeamItem";

function TeamList() {
  const { data: teamList, loading, errorMessage } = useFetchData(getUserMemberships);

  if (loading) {
    return (
      <div className="pb-80 pt-180">
        <Spinner size={200} color="#fff" />
      </div>
    );
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <>
      {teamList && teamList.length !== 0 ? (
        <>
          <h2 className="py-80 text-center text-4xl">소속된 팀 리스트</h2>
          <ul className="w-560">
            {teamList.map((data: Membership) => (
              <TeamItem key={data.groupId} data={data} />
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="relative mt-186 h-98 w-312 md:mt-212 md:h-164 md:w-520 lg:h-255 lg:w-810">
            <img
              src="/images/no_content_image.png"
              alt="박스를 든 세 사람이 왼쪽에서 걸어가고 KEEP GOING과 THIS WAY가 쓰인 표지판이 가운데 있다. 제일 오른쪽에는 신호등 모양의 그림이 있다."
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-32 text-text-default md:mt-48">아직 소속된 팀이 없습니다.</p>
          <p className="text-text-default">팀을 생성하거나 팀에 참여해보세요.</p>
        </>
      )}
    </>
  );
}

export default TeamList;
