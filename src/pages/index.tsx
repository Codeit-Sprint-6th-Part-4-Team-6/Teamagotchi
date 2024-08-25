import Image from "next/image";
import LottieAnimation from "@components/commons/LottieAnimation";
import TEAM_PAGE_IMG from "@images/team_page_image.png";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full items-center justify-center bg-[url('/images/landing-main-image.png')] bg-cover bg-center">
        <div className="relative mt-100 flex w-650 flex-col items-center overflow-hidden rounded-10 border border-border-primary border-opacity-10 bg-background-secondary py-50 text-center">
          <div className="absolute left-0 top-0 flex h-30 w-full items-center bg-[#2B2B2B]">
            <div className="ml-10 flex gap-5">
              <div className="h-12 w-12 rounded-full bg-[#ED6A5E]" />
              <div className="h-12 w-12 rounded-full bg-[#F5BF4F]" />
              <div className="h-12 w-12 rounded-full bg-[#62C554]" />
            </div>
            <div />
          </div>
          <LottieAnimation type="success" size={200} />
          <div className="mt-50">
            <h2 className="flex items-center text-[48px] font-semibold text-text-primary">
              <span className="bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end bg-clip-text text-[48px] font-semibold text-text-transparent">
                티마고치
              </span>
              로 팀을 키우세요 🐣
            </h2>
            <h3>팀 성장의 비결, 작은 할 일들이 모여 팀을 더 강하게!</h3>
          </div>
          <button className="mt-30 w-full rounded-32 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end py-13 text-lg md:w-373">
            지금 시작하기
          </button>
        </div>
      </div>

      <div className="mt-150 flex flex-col gap-50">
        <div className="flex h-354 w-full items-center justify-center rounded-40 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end shadow-[0px_0px_12px_2px_#FFFFFF40] md:w-696 lg:w-996">
          <div className="relative box-border flex h-[99%] w-[99.5%] items-center justify-center overflow-hidden rounded-40 bg-[#242424]">
            <Image
              src={TEAM_PAGE_IMG}
              width={235}
              height={273}
              alt=""
              className="absolute bottom-0 left-150"
            />
            <div className="ml-200">
              <div className="mb-10 flex h-48 w-48 items-center justify-center rounded-10 border border-border-primary border-opacity-10 bg-background-secondary">
                <Image src="icons/icon_folder.svg" alt="" width={18} height={14} />
              </div>
              <p className="text-2xl">
                그룹으로
                <br /> 할 일을 관리해요
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-354 w-full items-center justify-center rounded-40 border border-border-primary border-opacity-10 bg-background-secondary md:w-696 lg:w-996">
          <div />
        </div>

        <div className="flex h-354 w-full items-center justify-center rounded-40 border border-border-primary border-opacity-10 bg-brand-primary bg-opacity-95 md:w-696 lg:w-996">
          <div />
        </div>
      </div>

      <div className="mt-100">
        <p className="text-40 font-semibold">지금 바로 시작해보세요</p>
        <p>팀원 모두 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법</p>
      </div>
    </main>
  );
}
