import { useState } from "react";
import Image from "next/image";

export default function TeamList() {
  const [teamList, setTeamList] = useState([]);

  return (
    <>
      {teamList.length !== 0 ? (
        <h2 className="mb-24 text-center text-4xl md:mb-80">소속된 팀 리스트</h2>
      ) : (
        <>
          <div className="relative mt-186 h-98 w-312 md:mt-272 md:h-164 md:w-520 lg:mt-212 lg:h-255 lg:w-810">
            <Image
              fill
              src="/images/no_content_image.png"
              alt="박스를 든 세 사람이 왼쪽에서 걸어가고 KEEP GOING과 THIS WAY가 쓰인 표지판이 가운데 있다. 제일 오른쪽에는 신호등 모양의 그림이 있다."
            />
          </div>
          <p className="mt-32 text-text-default md:mt-48">아직 소속된 팀이 없습니다.</p>
          <p className="mb-48 text-text-default md:mb-80">팀을 생성하거나 팀에 참여해보세요.</p>
        </>
      )}
    </>
  );
}
