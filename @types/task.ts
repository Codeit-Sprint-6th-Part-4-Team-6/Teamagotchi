declare module '@coworkers-types' {
  export type PostTaskRequest = {
    name: string;
    description: string;
    displayIndex: number;
    frequencyType: string;
    monthDay: number;
  };

  export type PatchTaskRequest = {
    name: string;
    description: string;
    displayIndex: number;
    done: boolean;
  };

  export type PatchTaskResponse = {
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

  export type Task = {
    groupId: number;
    taskListId: number;
    monthDay: number;
    weekDays: number[];
    frequencyType: string;
    displayIndex: number;
    updatedAt: string;
    createdAt: string;
    description: string;
    name: string;
    id: number;
  };

  export type DateTask = {
    deletedAt: string;
    recurringId: number;
    frequency: string;
    userId: number;
    date: string;
    doneAt: string;
    updatedAt: string;
    name: string;
    id: number;
  };

  export type TaskDetails = {
    comments: CommentInfo[];
    recurring: Recurring;
    user: TaskUserInfo;
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

  export type TaskUserInfo = {
    image: string;
    nickname: string;
    id: number;
  };

  export type Recurring = {
    groupId: number;
    taskListId: number;
    monthDay: number;
    weekDays: number[];
    frequencyType: string;
    displayIndex: number;
    updatedAt: string;
    createdAt: string;
    description: string;
    name: string;
    id: number;
  };
}
