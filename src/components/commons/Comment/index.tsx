import { ArticleComment, TaskComment } from "@coworkers-types";
import classNames from "classnames";
import DOMPurify from "isomorphic-dompurify";
import { calculateElapsedTime } from "@utils/calculateElapsedTime";
import { checkIsLink } from "@utils/checkIsLink";
import { isTaskCommentType } from "@utils/typeGuard/isTaskCommentType";
import Button from "../Button";
import TextButton from "../Button/TextButton";
import NameTag from "../NameTag";
import EditDeletePopover from "../Popover/EditDeletePopover";
import Textarea from "../TextArea";
import useComment from "./useComment";

type CommentProps = {
  type: "task" | "article";
  comment: TaskComment | ArticleComment;
  articleId?: number;
};

/**
 * 댓글 하나를 보여주는 컴포넌트입니다, 어떤 종류인지, 댓글의 정보, 게시글의 경우 어떤 게시글인지 등의 정보를 받아 렌더링합니다.
 * @param type = "task" | "article", comment = TaskComment | ArticleComment, articleId?: number;
 * @returns 댓글을 렌더링 합니다.
 */

export default function Comment({ type, comment, articleId }: CommentProps) {
  const {
    isEditMode,
    setIsEditMode,
    showKebab,
    handleBlur,
    handleDelete,
    handleCancel,
    handleEdit,
  } = useComment(comment, articleId);

  const classnames = classNames(
    "w-full flex flex-col",
    type === "task"
      ? "border-b border-solid border-border-primary pb-16 gap-16"
      : "bg-background-secondary rounded-[8px] p-16 md:px-24 md:py-20 gap-24 lg:gap-32"
  );

  return (
    <div className={classnames}>
      {isEditMode ? (
        <>
          <Textarea
            type="transparent"
            placeholder="댓글을 입력해주세요."
            defaultValue={comment.content}
            onBlur={handleBlur}
          />
          <div className="flex justify-end gap-8">
            <TextButton
              buttonType="button"
              className="w-48 justify-center text-14 font-semibold text-text-default md:text-14"
              onClick={handleCancel}
            >
              취소
            </TextButton>
            <Button size="small" buttonStyle="transparent" onClick={handleEdit}>
              수정하기
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="text-md font-normal text-text-primary">
              {comment.content.split("\n").map((line) => (
                <p
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(checkIsLink(line)) }}
                  key={line}
                />
              ))}
            </div>
            {showKebab && (
              <EditDeletePopover
                icon="kebabSmall"
                handleModify={() => setIsEditMode(true)}
                handleDelete={handleDelete}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <NameTag
              type={type === "task" ? "default-12" : "default-6"}
              image={isTaskCommentType(comment) ? comment.user.image : comment.writer.image}
              name={isTaskCommentType(comment) ? comment.user.nickname : comment.writer.nickname}
            />
            <span className="text-md font-normal text-text-secondary">
              {calculateElapsedTime(comment.createdAt)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
