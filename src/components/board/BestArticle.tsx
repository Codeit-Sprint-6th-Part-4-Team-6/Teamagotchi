import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Label from "@components/commons/Label";
import { formatDate } from "@utils/formatDate";
import { IconBestBadge, IconComment, IconHeart } from "@utils/icon";
import { axiosInstance } from "../../pages/api/axios";

interface RootObject {
  list: List[];
  totalCount: number;
}

interface List {
  id: number;
  title: string;
  image: null;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  likeCount: number;
}

interface Writer {
  id: number;
  nickname: string;
}

export default function BestArticle() {
  const [bestPosts, setBestPosts] = useState<List[]>([]);

  const getBest = async () => {
    const res = await axiosInstance.get("/articles?page=1&pageSize=3&orderBy=like");
    const posts = res.data.list ?? [];
    setBestPosts(posts);
  };

  useEffect(() => {
    try {
      getBest();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="mx-0 my-auto flex flex-col">
      <Label content="베스트 게시글" />
      <div className="flex gap-24">
        {bestPosts.map((item) => (
          <Link key={item.id} href={`/board/${item.id}`}>
            <div className="flex h-169 w-384 flex-col justify-between rounded-8 bg-[#1E293B] p-14 pb-10">
              <IconBestBadge />
              <div className="flex justify-between">
                <span className="text-18 font-[500] text-[#CBD5E1]">{item.title}</span>
                {item.image && <Image width={72} height={72} alt="image" src={item.image} />}
              </div>
              <span className="text-14 font-[500] text-[#94A3B8]">
                {formatDate(item.createdAt)}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-14 font-[400] text-[#F8FAFC]">{item.writer.nickname}</span>
                <div className="flex gap-12">
                  <div className="flex items-center justify-center gap-5">
                    <IconComment />
                    <span className="text-14 font-[400] text-[#94A3B8]">{item.likeCount}</span>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <IconHeart />
                    <span className="text-14 font-[400] text-[#94A3B8]">{item.likeCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
