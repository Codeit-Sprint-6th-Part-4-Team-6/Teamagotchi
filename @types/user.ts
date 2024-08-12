declare module "@coworkers-types" {
  type BaseUserEntity = {
    updatedAt: ISODateString;
    createdAt: ISODateString;
    id: number;
  };

  type BaseUserInfo = BaseUserEntity & {
    teamId: string;
    image: string;
    nickname: string;
    email: string;
  };

  export type User = BaseUserInfo & {
    memberships: Membership[];
  };

  export type UserGroup = {
    createdAt: string;
    id: number;
    image: string | null;
    name: string;
    teamId: number;
    updatedAt: string;
  };

  export type UserRequest = {
    nickname?: string;
    image?: string;
  };

  export type History = {
    tasksDone: TaskDone[];
  }[];

  export type TaskDone = BaseTaskDetails & {
    displayIndex: number;
    description: string;
  };

  export type SendResetPasswordRequest = {
    email: string;
    redirectUrl: string;
  };

  export type Password = {
    passwordConfirmation: string;
    password: string;
  };

  export type ResetPassword = Password & { token: string };
}
