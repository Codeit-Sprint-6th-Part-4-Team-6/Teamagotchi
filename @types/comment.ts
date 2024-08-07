declare module "@coworkers-types" {
  type BaseCommentEntity = {
    updatedAt: ISODateString;
    createdAt: ISODateString;
    id: number;
  };

  type BaseCommentUserInfo = BaseCommentEntity & {
    teamId: string;
    image: string | null;
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

  export type CommentType = { user: CommentWriterInfo } & CommentInfo;

  export type Comments = CommentType[];

  export type CommentRequest = {
    content: string;
  };
}
