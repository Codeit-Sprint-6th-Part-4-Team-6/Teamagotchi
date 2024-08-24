import { IconGoogle, IconKakaotalk } from "@utils/icon";

type SocialLoginBoxProps = {
  type: "login" | "register";
  onGoogleClick: () => void;
  onKakaoClick: () => void;
};

/**
 * @prop type: "login" | "register"; 문구만 바뀝니다.
 * @prop onGoogleClick: () => void; 구글 아이콘 클릭했을 때 실행할 함수입니다.
 * @prop onKakaoClick: () => void; 카카오톡 아이콘 클릭했을 때 실행할 함수입니다.
 */

export default function SocialLoginBox({ type, onGoogleClick, onKakaoClick }: SocialLoginBoxProps) {
  return (
    <div className="w-full md:w-460">
      <div className="mb-16 flex items-center gap-24">
        <div className="h-1 flex-1 border border-solid border-border-primary" />
        <span className="text-lg font-normal text-text-inverse">OR</span>
        <div className="h-1 flex-1 border border-solid border-border-primary" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-text-inverse">{`간편 ${type === "login" ? "로그인" : "회원가입"}하기`}</span>
        <div className="flex gap-16">
          <button
            type="button"
            onClick={onGoogleClick}
            aria-label={`Google ${type === "login" ? "login" : "register"}`}
          >
            <IconGoogle />
          </button>
          <button
            type="button"
            onClick={onKakaoClick}
            aria-label={`Kakao ${type === "login" ? "login" : "register"}`}
          >
            <IconKakaotalk />
          </button>
        </div>
      </div>
    </div>
  );
}
