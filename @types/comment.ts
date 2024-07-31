declare module '@coworkers-types' {
  export type Comments = [{ user: CommentWriterInfo } & CommentInfo];

  export type CommentWriterInfo = {
    teamId: string;
    image: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    encryptedPassword: string;
    email: string;
    id: number;
  };

  export type CommentInfo = {
    userId: number;
    taskId: number;
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  };

  export type CommentRequest = {
    content: string;
  };
}
