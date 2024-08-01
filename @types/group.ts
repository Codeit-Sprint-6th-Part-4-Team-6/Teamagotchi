declare module "@coworkers-types" {
  type BaseGroupEntity = {
    updatedAt: ISODateString;
    createdAt: ISODateString;
    name: string;
    id: number;
  };

  export type Group = BaseGroupEntity & {
    image: string;
    teamId: string;
    members: Member[];
    taskLists: GroupTaskLists[];
  };

  export type GroupInfo = Omit<Group, "members" | "taskLists">;

  export type GroupTaskLists = BaseGroupEntity & {
    groupId: number;
    displayIndex: number;
    tasks: string[];
  };

  export type Member = {
    role: string;
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  };

  export type AcceptInvitation = {
    userEmail: string;
    token: string;
  };
}
