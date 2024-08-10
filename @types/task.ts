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
    frequency: string;
    date: ISODateString;
    doneAt: ISODateString;
    name: string;
    updatedAt: ISODateString;
    id: number;
    commentCount: number;
  };

  export type PostTaskRequest = Omit<BaseTaskEntity, "updatedAt" | "createdAt" | "id">;

  export type PatchTaskRequest = Omit<PostTaskRequest, "frequencyType" | "monthDay"> & {
    done: boolean;
  };

  export type PatchTaskResponse = BaseTaskDetails;

  export type Task = BaseTaskEntity & {
    groupId: number;
    taskListId: number;
    weekDays: number[];
  };

  export type DateTask = BaseTaskDetails & {
    recurringId: number;
    userId: number;
  };

  export type TaskDetails = BaseTaskDetails & {
    comments: CommentInfo[];
    recurring: Recurring;
    user: TaskUserInfo;
    description: string;
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
