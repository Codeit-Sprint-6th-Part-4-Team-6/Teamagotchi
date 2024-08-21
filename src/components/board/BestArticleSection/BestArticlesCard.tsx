import { Article } from "@coworkers-types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NameTag from "@components/commons/NameTag";
import { formatDate } from "@utils/formatDate";
import { IconBestBadge, IconComment, IconHeart } from "@utils/icon";

export default function BestArticleCard({ item }: { item: Article }) {
  return (
    <Link key={item.id} href={`/board/${item.id}`} className="w-full">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="flex h-169 flex-col justify-between rounded-8 bg-background-secondary p-14 pb-10"
      >
        <IconBestBadge />
        <div className="flex justify-between">
          <span className="text-18 font-[500] text-text-primary">{item.title}</span>
          {item.image && <Image width={72} height={72} alt="image" src={item.image} />}
        </div>
        <span className="text-14 font-[500] text-interaction-inactive">
          {formatDate(item.createdAt)}
        </span>
        <div className="flex items-center justify-between">
          <NameTag type="default-12" image={null} name={item.writer.nickname} />
          <div className="flex gap-12">
            <div className="flex items-center justify-center gap-5">
              <IconComment />
              <span className="text-14 font-[400] text-interaction-inactive">
                {item.commentCount}
              </span>
            </div>
            <div className="flex items-center justify-center gap-5">
              <IconHeart />
              <span className="text-14 font-[400] text-interaction-inactive">{item.likeCount}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
