// src/components/TeamDetailPage/TaskTypes.ts

export interface IWriter {
  id: number;
  image: string | null;
  nickname: string;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IDoneBy {
  user: IUser | null;
}

export interface ITask {
  commentCount: number;
  date: string;
  deletedAt: string | null;
  description: string;
  displayIndex: number;
  doneAt: string | null;
  doneBy: IDoneBy | null;
  frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  id: number;
  name: string;
  recurringId: number;
  updatedAt: string;
  user: IUser | null;
  writer: IWriter;
}

export interface ITaskList {
  createdAt: string;
  displayIndex: number;
  groupId: number;
  id: number;
  name: string;
  updatedAt: string;
  tasks: ITask[];
}
