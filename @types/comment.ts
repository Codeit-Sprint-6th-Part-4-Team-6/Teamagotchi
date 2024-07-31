declare module '@coworkers-types' {
  type BaseCommentEntity = {
    updatedAt: string;
    createdAt: string;
    id: number;
  };

  type BaseCommentUserInfo = BaseCommentEntity & {
    teamId: string;
    image: string;
    nickname: string;
    email: string;
  };

  export type CommentWriterInfo = BaseCommentUserInfo & {
    encryptedPassword: string;
  };

  export type CommentInfo = BaseCommentEntity & {
    userId: number;
    taskId: number;
    content: string;
  };

  export type Comments = [{ user: CommentWriterInfo } & CommentInfo];

  export type CommentRequest = {
    content: string;
  };
}
