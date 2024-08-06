import { useEffect, useState } from "react";

/**
 *
 * @param apiFunction - 데이터를 패칭하는 api 함수를 매개변수로 받습니다.
 * @param params - 패치 시 id가 필요한 경우 id를 매개변수로 받습니다.
 * @returns
 * data - 패칭한 데이터가 담겨있습니다.
 * loading - 로딩 중인지 여부를 boolean 으로 나타냅니다.
 * errorMessage - 에러가 발생한 경우 에러 메세지가 담겨있습니다.
 */
export const useFetchData = <T, P extends any[]>(
  apiFunction: (...params: P) => Promise<T>,
  ...params: P
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await apiFunction(...params);
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [...params]);

  return { data, loading, errorMessage };
};
