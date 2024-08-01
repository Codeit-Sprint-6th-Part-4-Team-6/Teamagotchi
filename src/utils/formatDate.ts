import { ISODateString } from "@coworkers-types";

/**
 * 날짜 문자열을 받아 일정 형식으로 정렬합니다.
 * @param dateString - ISODateString 타입의 날짜 문자열(ex "2024-07-01T07:20:51.162Z")입니다.
 * @param type - 리턴받을 문자열의 종류를 정합니다. default의 경우 "2024.07.01" 형식, kor의 경우 "2024년 7월 1일" 형식의 문자열을 리턴합니다. 기본값은 "default"입니다.
 * @returns type에 따라 "2024.07.01" 형식 또는 "2024년 7월 1일" 형식의 문자열을 반환합니다.
 */

export const formatDate = (dateString: ISODateString, type: "default" | "kor" = "default") => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "Invalid date string format";

  const year = date.getFullYear();
  const month =
    type === "default" ? String(date.getMonth() + 1).padStart(2, "0") : String(date.getMonth() + 1);
  const day = type === "default" ? String(date.getDate()).padStart(2, "0") : String(date.getDate());
  return type === "default" ? `${year}.${month}.${day}` : `${year}년 ${month}월 ${day}일`;
};
