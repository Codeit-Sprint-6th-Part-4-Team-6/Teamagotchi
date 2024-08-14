import React, { useState } from "react";
import { ArticleComment, TaskComment } from "@coworkers-types";
import useDeleteComment from "@hooks/comment/useDeleteComment";
import useEditComment from "@hooks/comment/useEditComment";
import { useModal } from "@hooks/useModal";
import { useAuthStore } from "@store/useAuthStore";
import { isTaskCommentType } from "@utils/typeGuard/isTaskCommentType";
import {
  CancelCommentEditModal,
  ConfirmCommentEditModal,
  DeleteCommentModal,
} from "./CommentModal";

/**
 * Comment 컴포넌트의 로직을 모아놓은 훅입니다.
 */

function useComment(comment: TaskComment | ArticleComment, articleId?: number) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(comment.content);
  const deleteCommentMutation = useDeleteComment(articleId);
  const editCommentMutation = useEditComment(articleId);
  const { openModal } = useModal();
  const { user } = useAuthStore();
  // const user = {
  //   id: 86,
  // };

  const showKebab = isTaskCommentType(comment)
    ? comment.userId === user?.id
    : comment.writer.id === user?.id;

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleDelete = () => {
    openModal("DeleteCommentModal", DeleteCommentModal, {
      onConfirm: () => deleteCommentMutation.mutate(comment),
    });
  };

  const handleCancel = () => {
    openModal("CancelCommentEditModal", CancelCommentEditModal, {
      onConfirm: () => setIsEditMode(false),
    });
  };

  const handleEdit = () => {
    if (!value) {
      handleDelete();
    } else {
      openModal("ConfirmCommentEditModal", ConfirmCommentEditModal, {
        onConfirm: () => {
          editCommentMutation.mutate({ comment, content: value });
          setIsEditMode(false);
        },
      });
    }
  };

  return {
    isEditMode,
    setIsEditMode,
    showKebab,
    handleBlur,
    handleDelete,
    handleCancel,
    handleEdit,
  };
}

export default useComment;
