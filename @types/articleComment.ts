declare module "@coworkers-types" {
  export type ArticleComment = {
    writer: Writer;
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  };

  export type Writer = {
    image: string;
    nickname: string;
    id: number;
  };

  export type ArticleCommentList = {
    nextCursor: number;
    list: ArticleComment[];
  };
}
