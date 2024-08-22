import { ISODateString } from "@coworkers-types";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const calculateElapsedTime = (dateString: ISODateString) => {
  const d = new Date(dateString);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  if (diff < 60 * 1) {
    return "방금 전";
  }
  if (diff < 60 * 60 * 24 * 3) {
    const distance = formatDistanceToNow(d, { addSuffix: true, locale: ko });
    return distance.replace(/^약\s/, "");
  }
  return format(d, "yy.M.d", { locale: ko });
};
