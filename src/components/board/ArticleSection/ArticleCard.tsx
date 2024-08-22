import { Article } from "@coworkers-types";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import NameTag from "@components/commons/NameTag";
import { IconComment, IconHeart } from "@utils/icon";

export default function ArticleCard({ Post }: { Post: Article }) {
  const { id, title, image, createdAt, writer, likeCount } = Post;
  return (
    <Link href={`/board/${id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="mb-24 flex h-176 w-full flex-col justify-between rounded-8 bg-background-secondary p-24"
      >
        <div className="flex justify-between">
          <span className="text-18 font-[500] text-text-primary">{title}</span>
          {image && <Image width={72} height={72} alt="image" src={image} />}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-12">
            <NameTag type="default-12" image={writer.image} name={writer.nickname} />
            <div className="border-l border-solid border-background-tertiary pl-12">
              <span className="text-14 font-[500] text-text-disabled">
                {format(createdAt, "yyyy.MM.dd")}
              </span>
            </div>
          </div>
          <div className="flex gap-12">
            <div className="flex items-center justify-center gap-5">
              <IconComment />
              <span className="text-14 font-[400] text-[#94A3B8]">{likeCount}</span>
            </div>
            <div className="flex items-center justify-center gap-5">
              <IconHeart />
              <span className="text-14 font-[400] text-[#94A3B8]">{likeCount}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
