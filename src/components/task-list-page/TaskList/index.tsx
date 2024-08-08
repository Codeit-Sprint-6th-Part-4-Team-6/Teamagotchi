import { useState } from "react";
import classNames from "classnames";
import Task from "../Task";

const mock = {
  id: 157,
  name: "말도 안돼",
  image:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/121/IMG_8561.jpeg",
  createdAt: "2024-08-08T07:05:54.407Z",
  updatedAt: "2024-08-08T07:05:54.407Z",
  teamId: "6-6",
  members: [
    {
      userId: 121,
      groupId: 157,
      userName: "조현지다",
      userEmail: "yaya@naver.com",
      userImage: null,
      role: "ADMIN",
    },
  ],
  taskLists: [
    {
      id: 66,
      name: "조현지가 할 일",
      createdAt: "2024-08-08T09:01:07.648Z",
      updatedAt: "2024-08-08T09:01:07.648Z",
      groupId: 157,
      displayIndex: 0,
      tasks: [],
    },
    {
      id: 67,
      name: "내 맘대로 할 일",
      createdAt: "2024-08-08T09:01:29.239Z",
      updatedAt: "2024-08-08T09:01:29.239Z",
      groupId: 157,
      displayIndex: 1,
      tasks: [],
    },
    {
      id: 68,
      name: "내가 만든 할 일",
      createdAt: "2024-08-08T09:01:37.206Z",
      updatedAt: "2024-08-08T09:01:37.206Z",
      groupId: 157,
      displayIndex: 2,
      tasks: [],
    },
    {
      id: 69,
      name: "김제완의 할 일",
      createdAt: "2024-08-08T09:01:45.567Z",
      updatedAt: "2024-08-08T09:01:45.567Z",
      groupId: 157,
      displayIndex: 3,
      tasks: [
        {
          id: 447,
          updatedAt: "2024-08-08T09:07:27.794Z",
          date: "2024-08-08T00:00:00.000Z",
          doneAt: null,
          recurringId: 214,
          name: "안냐세요",
          description: null,
          frequency: "DAILY",
          deletedAt: null,
          userId: null,
          displayIndex: -1,
          commentCount: 0,
        },
        {
          id: 448,
          updatedAt: "2024-08-08T09:07:27.794Z",
          date: "2024-08-08T00:00:00.000Z",
          doneAt: null,
          recurringId: 215,
          name: "안양시 여러분",
          description: null,
          frequency: "DAILY",
          deletedAt: null,
          userId: null,
          displayIndex: 0,
          commentCount: 0,
        },
      ],
    },
  ],
};

export default function TaskList() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleActiveTab = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <section>
      <div className="mb-16 mt-19 flex gap-12">
        {mock.taskLists.map((taskList, index) => (
          <div
            key={taskList.id}
            className="flex cursor-pointer flex-col gap-5"
            onClick={() => handleActiveTab(index)}
          >
            <span
              className={classNames("text-text-default", {
                "text-text-inverse": activeTabIndex === index,
              })}
            >
              {taskList.name}
            </span>
            {activeTabIndex === index && (
              <span className="w-full border-b-[1.5px] border-solid border-text-inverse" />
            )}
          </div>
        ))}
      </div>
      <Task />
    </section>
  );
}
