declare module "@coworkers-types" {
  type BaseCommentEntity = {
    updatedAt: ISODateString;
    createdAt: ISODateString;
    id: number;
  };

  type TaskCommentUserInfo = BaseCommentEntity & {
    teamId: string;
    image: string | null;
    nickname: string;
    email: string;
  };

  export type TaskCommentWriterInfo = TaskCommentUserInfo & {
    encryptedPassword: string;
  };

  export type TaskCommentInfo = BaseCommentEntity & {
    userId: number;
    taskId: number;
    content: string;
  };

  export type TaskComment = { user: TaskCommentWriterInfo } & TaskCommentInfo;

  export type TaskCommentList = TaskComment[];
}
