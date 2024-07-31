declare module '@coworkers-types' {
  export type Group = {
    updatedAt: string;
    createdAt: string;
    image: string;
    name: string;
    teamId: string;
    id: number;
    members: Member[];
    taskLists: GroupTaskLists[];
  };

  export type GroupInfo = {
    updatedAt: string;
    createdAt: string;
    image: string;
    name: string;
    teamId: string;
    id: number;
  };

  export type GroupTaskLists = {
    groupId: number;
    displayIndex: number;
    updatedAt: string;
    createdAt: string;
    name: string;
    id: number;
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
