declare module '@coworkers-types' {
  type BaseUserEntity = {
    updatedAt: string;
    createdAt: string;
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
    deletedAt: string;
    userId: number;
    recurringId: number;
    frequency: string;
    date: string;
    doneAt: string;
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
