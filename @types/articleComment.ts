declare module "@coworkers-types" {
  export type ArticleComment = BaseCommentEntity & {
    writer: Writer;
    content: string;
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
