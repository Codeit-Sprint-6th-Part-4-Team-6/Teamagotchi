import { Article } from "@coworkers-types";
import Image from "next/image";
import Link from "next/link";
import NameTag from "@components/commons/NameTag";
import { formatDate } from "@utils/formatDate";
import { IconComment, IconHeart } from "@utils/icon";

export default function ArticleCard({ Post }: { Post: Article }) {
  const { id, title, image, createdAt, writer, likeCount } = Post;
  return (
    <Link href={`/board/${id}`}>
      <div className="mb-24 flex h-176 w-full flex-col justify-between rounded-8 bg-background-secondary p-24">
        <div className="flex justify-between">
          <span className="text-18 font-[500] text-text-primary">{title}</span>
          {image && <Image width={72} height={72} alt="image" src={image} />}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-12">
            <NameTag type="default-12" image={writer.image} name={writer.nickname} />
            <div className="border-l border-solid border-background-tertiary pl-12">
              <span className="text-14 font-[500] text-text-disabled">{formatDate(createdAt)}</span>
            </div>
          </div>
          <div className="flex gap-12">
            <div className="flex items-center justify-center gap-5">
              <IconComment />
              {/* NOTE: 댓글 수 표기가 안돼서 일단 좋아요갯수로 테스트해봄 */}
              <span className="text-14 font-[400] text-[#94A3B8]">{likeCount}</span>
            </div>
            <div className="flex items-center justify-center gap-5">
              <IconHeart />
              <span className="text-14 font-[400] text-[#94A3B8]">{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
