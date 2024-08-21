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
    deletedAt: ISODateString | null;
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

  export type PostTaskRequest = {
    name: string;
    description: string;
    startDate: ISODateString;
    frequencyType: string;
    monthDay?: number;
    weekDays?: number[];
  };

  export type TaskState = {
    name: string;
    description: string;
    startDate: ISODateString;
    frequencyType: string;
  };

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
    startDate: ISODateString;
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

  export type TaskDetails = {
    id: number;
    updatedAt: ISODateString;
    date: ISODateString;
    doneAt: ISODateString | null;
    recurringId: number;
    name: string;
    description: string;
    frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
    deletedAt: ISODateString | null;
    displayIndex: number;
    recurring: Recurring;
    writer: TaskUserInfo;
    doneBy: {
      user: TaskUserInfo | null;
    };
    commentCount: number;
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
    image: string | null;
    nickname: string;
    id: number;
  };

  export type Recurring = {
    id: number;
    name: string;
    description: string;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    startDate: ISODateString;
    frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
    weekDays: number[] | null;
    monthDay: number | null;
    taskListId: number;
    groupId: number;
    writerId: number;
  };
}
