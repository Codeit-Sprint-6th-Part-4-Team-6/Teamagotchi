declare module "@coworkers-types" {
  export type BaseTaskEntity = {
    name: string;
    description: string;
    displayIndex: number;
    frequencyType: string;
    monthDay: number;
    updatedAt: ISODateString;
    createdAt: ISODateString;
    id: number;
  };

  export type BaseTaskDetails = {
    deletedAt: ISODateString;
    userId: number;
    recurringId: number;
    frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
    date: ISODateString;
    doneAt: ISODateString;
    name: string;
    updatedAt: ISODateString;
    id: number;
    commentCount: number;
  };

  export type PostTaskRequest = Omit<BaseTaskEntity, "updatedAt" | "createdAt" | "id">;

  export type PatchTaskRequest = {
    name?: string;
    description?: string;
    done?: boolean;
  };

  export type Task = BaseTaskEntity & {
    groupId: number;
    taskListId: number;
    weekDays: number[];
  };

  export type DateTask = {
    id: number;
    name: string;
    description: string;
    date: ISODateString;
    doneAt: ISODateString;
    updatedAt: ISODateString;
    user: TaskUserInfo;
    recurringId: number;
    deletedAt: ISODateString | null;
    displayIndex: number;
    writer: string | null;
    doneBy: {
      user: TaskUserInfo;
    };
    commentCount: number;
    frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  };

  export type TaskDetails = BaseTaskDetails & {
    comments: TaskCommentInfo[];
    recurring: Recurring;
    user: TaskUserInfo;
    description: string;
  };

  export type PatchTaskResponse = {
    displayIndex: number;
    writerId: number;
    userId: number;
    deletedAt: string;
    frequency: string;
    description: string;
    name: string;
    recurringId: number;
    doneAt: string;
    date: string;
    updatedAt: string;
    id: number;
  };

  export type TaskUserInfo = {
    image: string;
    nickname: string;
    id: number;
  };

  export type Recurring = BaseTaskEntity & {
    groupId: number;
    taskListId: number;
    weekDays: number[];
  };
}
