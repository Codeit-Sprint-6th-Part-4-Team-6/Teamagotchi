import { motion } from "framer-motion";
import Link from "next/link";

type LinkButtonProps = {
  className?: string;
  href: string | undefined;
  children: React.ReactNode;
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
      <motion.button whileTap={{ scale: 0.97 }} type="button" className={className}>
        <Link href={href} passHref>
          {children}
        </Link>
      </motion.button>
    );
  return null;
}
