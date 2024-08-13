export const getParams = (link: string) => {
  const url = new URL(link);
  const params = new URLSearchParams(url.search);

  return params;
};
