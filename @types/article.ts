declare module '@coworkers-types' {
  export type PostArticleRequest = {
    image: string;
    content: string;
    title: string;
  };

  export type BaseArticleEntity = {
    updatedAt: string;
    createdAt: string;
    likeCount: number;
    writer: Writer;
    image: string;
    title: string;
    id: number;
  };

  export type Article = BaseArticleEntity;

  export type ArticleWriter = {
    nickname: string;
    id: number;
  };

  export type TotalArticle = {
    totalCount: number;
    list: Article[];
  };

  export type ArticleDetails = BaseArticleEntity & {
    isLiked: boolean;
    content: string;
  };
}
