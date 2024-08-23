import Image from "next/image";
import { IconRepairLarge } from "@utils/icon";
import TEAM_PAGE_IMG from "@images/team_page_image.png";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex flex-col items-center text-center">
        <h1 className="flex items-center text-[48px] font-semibold text-text-primary">
          함께 만들어가는 투두 리스트 <IconRepairLarge className="ml-15" />
        </h1>
        <h2 className="bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end bg-clip-text text-[64px] font-semibold text-text-transparent">
          티마고치
        </h2>
        <button className="w-full rounded-32 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end py-13 text-lg md:w-373">
          지금 시작하기
        </button>
      </div>

      <div className="mt-100">
        <div className="flex h-354 w-full items-center justify-center rounded-40 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end shadow-[0px_0px_12px_2px_#FFFFFF40] md:w-696 lg:w-996">
          <div className="relative box-border flex h-[99%] w-[99.5%] items-center justify-center overflow-hidden rounded-40 bg-[#454545]">
            <Image
              src={TEAM_PAGE_IMG}
              width={235}
              height={273}
              alt=""
              className="absolute bottom-0 left-150"
            />
            <div className="ml-200">
              <p>
                그룹으로
                <br /> 할 일을 관리해요
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
