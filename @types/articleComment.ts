declare module "@coworkers-types" {
  export type ArticleComment = BaseCommentEntity & {
    writer: Writer;
    content: string;
  };

  export type Writer = {
    image: string | File | null;
    nickname: string;
    id: number;
  };

  export type ArticleCommentList = {
    nextCursor: number;
    list: ArticleComment[];
  };

  export type ArticleCommentsWithParams = {
    pageParams: number[];
    pages: { list: ArticleComment[]; nextCursor: number }[];
  };
}
