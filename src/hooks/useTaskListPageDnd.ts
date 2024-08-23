import { DropResult } from "react-beautiful-dnd";
import { TaskList } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchTaskOrder } from "@api/taskApi";

const useTaskListPageDnd = (
  teamId: string | string[] | undefined,
  taskListsId: string | string[] | undefined,
  date: string | string[] | undefined
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({
      groupId,
      taskListId,
      taskId,
      displayIndex,
    }: {
      groupId: string | string[] | undefined;
      taskListId: string | string[] | undefined;
      taskId: string | string[] | undefined;
      displayIndex: number;
      sourceIndex: number;
      dateString: string | string[] | undefined;
    }) => patchTaskOrder(groupId, taskListId, taskId, displayIndex),

    onMutate: async ({ taskListId, displayIndex, sourceIndex, dateString }) => {
      await queryClient.cancelQueries({ queryKey: ["taskList", Number(taskListId), dateString] });

      const previousTaskList = queryClient.getQueryData([
        "taskList",
        Number(taskListId),
        dateString,
      ]);

      queryClient.setQueryData(
        ["taskList", Number(taskListId), dateString],
        (oldTaskList: TaskList) => {
          const originData = [...oldTaskList.tasks];
          const [reorderedData] = originData.splice(sourceIndex, 1);
          originData.splice(displayIndex, 0, reorderedData);
          return {
            ...oldTaskList,
            tasks: originData,
          };
        }
      );

      return { previousTaskList };
    },

    onError: (error, variables, context) => {
      if (context?.previousTaskList) {
        queryClient.setQueryData(
          ["taskList", Number(variables.taskListId), variables.dateString],
          context.previousTaskList
        );
      }
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskList", Number(variables.taskListId), variables.dateString],
      });
    },
  });

  const handleDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (destination && destination.index !== source.index) {
      mutate({
        groupId: teamId,
        taskListId: taskListsId,
        taskId: draggableId,
        displayIndex: destination?.index,
        sourceIndex: source.index,
        dateString: date,
      });
    }
  };

  return { handleDragEnd };
};

export default useTaskListPageDnd;
