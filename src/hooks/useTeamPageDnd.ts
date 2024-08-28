import { DropResult } from "react-beautiful-dnd";
import { Group } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchTaskListOrder } from "@api/taskListApi";

const useTeamPageDnd = (teamId: string | string[] | undefined) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({
      groupId,
      taskListId,
      displayIndex,
    }: {
      groupId: string | string[] | undefined;
      taskListId: string | string[] | undefined;
      displayIndex: number;
      sourceIndex: number;
    }) => patchTaskListOrder(groupId, taskListId, displayIndex),

    onMutate: async ({ groupId, displayIndex, sourceIndex }) => {
      await queryClient.cancelQueries({ queryKey: ["group", groupId] });

      const previousGroup = queryClient.getQueryData(["group", groupId]);

      queryClient.setQueryData(["group", groupId], (oldGroup: Group) => {
        const originData = [...oldGroup.taskLists];
        const [reorderedData] = originData.splice(sourceIndex, 1);
        originData.splice(displayIndex, 0, reorderedData);
        return {
          ...oldGroup,
          taskLists: originData,
        };
      });

      return { previousGroup };
    },

    onError: (error, variables, context) => {
      if (context?.previousGroup) {
        queryClient.setQueryData(["group", variables.groupId], context.previousGroup);
      }
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["group", variables.groupId] });
    },
  });

  const handleDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (destination && destination.index !== source.index) {
      mutate({
        groupId: teamId,
        taskListId: draggableId,
        displayIndex: destination?.index,
        sourceIndex: source.index,
      });
    }
  };

  return { handleDragEnd };
};

export default useTeamPageDnd;
