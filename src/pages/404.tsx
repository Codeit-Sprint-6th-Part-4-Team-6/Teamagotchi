import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import LottieAnimation from "@components/commons/LottieAnimation";
import useMediaQuery from "@hooks/useMediaQuery";

export default function NotFound() {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  const router = useRouter();
  return (
    <div className="m-auto mt-100 md:mt-230 md:flex md:items-center md:justify-center md:gap-30">
      {isMobile && <LottieAnimation type="error" size={100} />}
      {isTablet && <LottieAnimation type="error" size={220} />}
      {isDesktop && <LottieAnimation type="error" size={250} />}
      <div className="flex flex-col items-center justify-center">
        <span className="text-40 font-bold text-brand-primary md:text-100">404</span>
        <span className="relative bottom-10 text-20 font-bold text-brand-primary md:bottom-40 md:text-40">
          Not Found
        </span>
        <span className="relative text-14 md:bottom-20 md:text-16">
          이런, 티마고치가 길을 잃었어요!
        </span>
        <div className="w-100 md:w-full">
          <Button
            onClick={() => router.back()}
            className="relative top-20 md:static"
            type="button"
            buttonStyle="outlined"
          >
            <span className="text-14 md:text-16">뒤로 돌아가기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
