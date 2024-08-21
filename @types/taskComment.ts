declare module "@coworkers-types" {
  type BaseCommentEntity = {
    updatedAt: ISODateString;
    createdAt: ISODateString;
    id: number;
  };

  type TaskCommentUserInfo = {
    image: string | null;
    nickname: string;
    id: number;
  };

  export type TaskCommentInfo = BaseCommentEntity & {
    userId: number;
    taskId: number;
    content: string;
  };

  export type TaskComment = { user: TaskCommentUserInfo } & TaskCommentInfo;

  export type TaskCommentList = TaskComment[];
}

// user: {
//   image: string | null;
//   nickname: string;
//   id: number;
// }
