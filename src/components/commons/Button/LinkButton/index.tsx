import Link from "next/link";

type LinkButtonProps = {
  className: string;
  href: string | undefined;
  children: string;
};

/**
 * 링크로 감싸진 버튼 컴포넌트입니다.
 * @param className css를 정의해주세요.
 * @param href 이동할 주소를 작성해주세요.
 * @param children 버튼의 텍스트를 작성해주세요.
 * @returns
 */
export default function LinkButton({ className, href, children }: LinkButtonProps) {
  if (href)
    return (
      <Link href={href}>
        <button type="button" className={`${className}`}>
          {children}
        </button>
      </Link>
    );
}
