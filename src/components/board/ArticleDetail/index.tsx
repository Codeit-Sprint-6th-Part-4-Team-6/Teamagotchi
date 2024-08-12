import { ArticleDetails } from "@coworkers-types";
import Image from "next/image";
import { useRouter } from "next/router";
import NameTag from "@components/commons/NameTag";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import { formatDate } from "@utils/formatDate";
import { IconComment, IconHeart } from "@utils/icon";
import { deleteArticle } from "@api/articleApi";
import DeleteArticleModal from "./DeleteArticleModal";

export default function ArticleDetail({ article }: { article?: ArticleDetails }) {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const { user } = useAuthStore();
  const { toast } = useToast();

  if (!article) {
    return router.push("/board");
  }

  const { title, writer, createdAt, likeCount, image, content, id } = article;

  const handleDeleteConfirm = () => {
    deleteArticle(id).then(() => {
      toast("success", "게시글 삭제에 성공했습니다.");
      closeModal();
      router.push("/board");
    });
  };

  const handleOpenWarnModal = () => {
    openModal("DeleteModal", DeleteArticleModal, { onConfirm: handleDeleteConfirm });
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-between">
        <h1 className="text-18 font-[500] text-text-secondary">{title}</h1>
        {user?.id === writer.id && (
          <EditDeletePopover
            icon="kebabLarge"
            handleModify={() => router.push(`/board/${id}/edit`)}
            handleDelete={handleOpenWarnModal}
          />
        )}
      </div>
      <div className="flex justify-between border-t border-solid border-background-tertiary">
        <div className="flex items-center gap-12 pt-20">
          <NameTag type="default-12" image={writer.image} name={writer.nickname} />
          <span className="border-l border-solid border-background-tertiary pl-12 text-14 font-[500] text-text-disabled">
            {formatDate(createdAt)}
          </span>
        </div>
        <div className="flex gap-12">
          <div className="flex items-center justify-center gap-5">
            <IconComment />
            <span className="text-14 font-[400] text-text-disabled">{likeCount}</span>
          </div>
          <div className="flex items-center justify-center gap-5">
            <IconHeart />
            <span className="text-14 font-[400] text-text-disabled">{likeCount}</span>
          </div>
        </div>
      </div>
      <div>
        {image && <Image width={512} height={512} src={image} alt="image" />}
        <p className="mt-4 text-lg font-normal text-text-secondary">{content}</p>
      </div>
    </div>
  );
}
