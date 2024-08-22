import { NextRouter } from "next/router";

export const updateURL = (
  date: Date,
  id: string | string[] | undefined,
  teamId: string | string[] | undefined,
  router: NextRouter
) => {
  const path = `/teams/${teamId}/task-lists/${id}`;
  const query = { date: date.toISOString().slice(0, 10) };
  router.push(
    {
      pathname: path,
      query,
    },
    undefined,
    { shallow: true }
  );
};
