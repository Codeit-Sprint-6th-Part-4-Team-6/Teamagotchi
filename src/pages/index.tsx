import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LottieAnimation from "@components/commons/LottieAnimation";
import useMediaQuery from "@hooks/useMediaQuery";
import COMMENTS_PAGE_IMG from "@images/landing-comments.png";
import INVITE_PAGE_IMG from "@images/landing-invite-page.png";
import TEAM_PAGE_IMG from "@images/team_page_image.png";

export default function Home() {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const isInView1 = useInView(ref1);
  const isInView2 = useInView(ref2);
  const isInView3 = useInView(ref3);

  useEffect(() => {
    let endPoint1 = 0;
    let endPoint2 = 0;
    let endPoint3 = 0;

    if (isDesktop) {
      endPoint1 = 45;
      endPoint2 = -45;
      endPoint3 = -45;
    }

    if (isTablet) {
      endPoint1 = 62;
      endPoint2 = -62;
      endPoint3 = -62;
    }

    if (isMobile) {
      endPoint1 = 0;
      endPoint2 = 0;
      endPoint3 = 0;
    }

    if (isInView1) controls1.start({ y: endPoint1, opacity: 1 });
    if (isInView2) controls2.start({ y: endPoint2, opacity: 1 });
    if (isInView3) controls3.start({ y: endPoint3, opacity: 1 });
  }, [isInView1, isInView2, isInView3]);

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full items-center justify-center bg-[url('/images/landing-main-bg-image.png')] bg-cover bg-center py-50">
        <div className="w-full min-w-340 px-40 md:w-696 lg:w-996">
          <div className="relative box-border flex w-full flex-col items-center overflow-hidden rounded-10 border border-border-primary border-opacity-10 bg-background-secondary px-20 py-50 text-center">
            <div className="absolute left-0 top-0 flex h-30 w-full items-center bg-[#2B2B2B]">
              <div className="ml-10 flex gap-5">
                <div className="h-12 w-12 rounded-full bg-[#ED6A5E]" />
                <div className="h-12 w-12 rounded-full bg-[#F5BF4F]" />
                <div className="h-12 w-12 rounded-full bg-[#62C554]" />
              </div>
            </div>
            <div className="mt-15">
              <LottieAnimation type="success" size={200} />
            </div>
            <div className="mt-20">
              <h2 className="text-[24px] font-semibold text-text-primary md:text-[40px] lg:text-[48px]">
                <span className="bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end bg-clip-text font-semibold text-text-transparent">
                  티마고치
                </span>
                로 팀을 키우세요 🐣
              </h2>
              <h3>팀 성장의 비결, 작은 할 일들이 모여 팀을 더 강하게!</h3>
            </div>
            <Link
              href="/login"
              className="mt-30 w-full rounded-32 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end py-13 text-lg transition-all hover:scale-105 hover:border md:w-373"
            >
              지금 시작하기
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-150 flex w-full min-w-340 flex-col gap-50 px-40 md:w-696 lg:w-996">
        <div
          ref={ref1}
          className="flex h-467 items-center justify-center rounded-40 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end shadow-[0px_0px_12px_2px_#FFFFFF40] md:h-354 lg:h-419"
        >
          <div className="flex h-[99%] w-[99.5%] flex-col-reverse items-center overflow-hidden rounded-40 bg-[#242424] md:flex-row md:justify-evenly">
            <motion.div
              initial={{ y: 320, opacity: 0 }}
              animate={controls1}
              transition={{ duration: 2.0 }}
            >
              <Image
                src={TEAM_PAGE_IMG}
                width={235}
                height={273}
                alt=""
                className="md:self-end lg:h-338 lg:w-291"
              />
            </motion.div>
            <div className="flex h-full w-235 flex-col justify-center pl-15 md:pl-0">
              <div className="mb-10 flex h-48 w-48 items-center justify-center rounded-10 border border-border-primary border-opacity-10 bg-background-secondary">
                <Image src="icons/icon_folder.svg" alt="" width={18} height={14} />
              </div>
              <p className="lg:leading-28 leading-21 text-18 lg:text-24">
                그룹으로
                <br /> 할 일을 관리해요
              </p>
            </div>
          </div>
        </div>

        <div
          ref={ref2}
          className="flex h-467 flex-col items-center justify-center overflow-hidden rounded-40 border border-border-primary border-opacity-10 bg-background-secondary md:h-354 md:flex-row-reverse md:justify-evenly lg:h-419"
        >
          <motion.div
            initial={{ y: -320, opacity: 0 }}
            animate={controls2}
            transition={{ duration: 1.5 }}
          >
            <Image
              src={INVITE_PAGE_IMG}
              width={235}
              height={273}
              alt=""
              className="md:self-start lg:h-338 lg:w-291"
            />
          </motion.div>

          <div className="flex h-full w-235 flex-col justify-center pl-15 md:items-end md:pl-0">
            <div className="mb-10 flex h-48 w-48 items-center justify-center rounded-10 border border-border-primary border-opacity-10 bg-background-secondary">
              <Image src="icons/icon_mail.svg" alt="" width={18} height={14} />
            </div>
            <p className="lg:leading-28 leading-21 text-18 md:text-right lg:text-24">
              간단하게 멤버들을
              <br /> 초대해요
            </p>
          </div>
        </div>

        <div
          ref={ref3}
          className="flex h-467 flex-col items-center justify-center overflow-hidden rounded-40 border border-brand-primary bg-[#111111] md:h-354 md:flex-row md:justify-evenly lg:h-419"
        >
          <motion.div
            initial={{ y: -320, opacity: 0 }}
            animate={controls3}
            transition={{ duration: 1.5 }}
          >
            <Image
              src={COMMENTS_PAGE_IMG}
              width={235}
              height={273}
              alt=""
              className="md:self-start lg:h-338 lg:w-291"
            />
          </motion.div>
          <div className="flex h-full w-235 flex-col justify-center pl-15 md:pl-0">
            <div className="mb-10 flex h-48 w-48 items-center justify-center rounded-10 border border-border-primary border-opacity-10 bg-background-secondary">
              <Image src="icons/icon_done_gradient.svg" alt="" width={24} height={24} />
            </div>
            <p className="lg:leading-28 leading-21 text-18 lg:text-24">
              할 일도 간편하게
              <br /> 체크해요
            </p>
          </div>
        </div>
      </div>

      <div className="mt-50 flex h-580 w-full justify-center bg-[url('/images/landing-bottom-bg-image.png')] bg-cover bg-center text-text-primary">
        <div className="mt-140 w-full min-w-340 px-40 text-center md:w-696 lg:w-996">
          <p className="mb-10 text-24 font-semibold md:text-40">지금 바로 시작해보세요</p>
          <p className="text-16 md:text-24">
            팀원 모두 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
          </p>
        </div>
      </div>
    </main>
  );
}
