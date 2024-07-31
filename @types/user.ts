declare module '@coworkers-types' {
  export type User = {
    groups: UserGroup[];
    teamId: string;
    image: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    email: string;
    id: number;
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

  export type TasksDone = {
    deletedAt: string;
    userId: number;
    recurringId: number;
    frequency: string;
    date: string;
    doneAt: string;
    description: string;
    name: string;
    updatedAt: string;
    id: number;
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
