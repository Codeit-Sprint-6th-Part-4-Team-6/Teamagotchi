import { Article } from "@coworkers-types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NameTag from "@components/commons/NameTag";
import { calculateElapsedTime } from "@utils/calculateElapsedTime";
import { IconComment, IconHeart } from "@utils/icon";

export default function ArticleCard({ Post }: { Post: Article }) {
  const { id, title, image, createdAt, writer, likeCount, commentCount } = Post;
  return (
    <Link href={`/board/${id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="mb-24 flex h-176 w-full flex-col justify-between rounded-8 bg-background-secondary p-24"
      >
        <div className="relative flex justify-between">
          <span className="truncate text-18 font-[500] text-text-primary">{title}</span>
          {image && <Image width={72} height={72} alt="image" src={image} />}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-12">
            <NameTag type="default-12" image={writer.image} name={writer.nickname} />
          </div>
          <div>
            <div className="flex justify-end">
              <span className="text-14 font-[500] text-text-disabled">
                {calculateElapsedTime(createdAt)}
              </span>
            </div>
            <div className="flex gap-12">
              <div className="flex items-center justify-center gap-5">
                <IconComment />
                <span className="text-14 font-[400] text-[#94A3B8]">{commentCount}</span>
              </div>
              <div className="flex items-center justify-center gap-5">
                <IconHeart />
                <span className="text-14 font-[400] text-[#94A3B8]">{likeCount}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
