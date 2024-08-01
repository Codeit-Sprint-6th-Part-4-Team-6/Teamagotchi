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
    groups: UserGroup[];
  };

  export type UserGroup = {
    role: string;
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  };

  export type UserRequest = {
    nickname?: string;
    image?: string;
  };

  export type History = {
    tasksDone: TasksDone[];
  };

  export type TasksDone = BaseUserEntity & {
    deletedAt: ISODateString;
    userId: number;
    recurringId: number;
    frequency: string;
    date: ISODateString;
    doneAt: ISODateString;
    description: string;
    name: string;
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
