import { useEffect, useRef } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface UseObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
  isFetching: boolean;
}

/**
 * 무한 스크롤 용 옵저버를 설정해주는 훅입니다. 리턴값인 targetRef를 트리거로 삼으려는 돔 요소의 ref prop안에 넣어줍니다.
 * @param threshold - 기본값은 0.0이고, 뷰포트와 타겟이 얼마나 교차했을 때 콜백을 실행할지 결정합니다(0.0~1.0),
 * @param hasNextPage - 다음 페이지가 있는지 여부를 가지는 불린값입니다.
 * @param fetchNextPage - 다음 페이지를 받아오는 함수입니다.
 * @param isFetching - 데이터를 받아오고 있는지에 대한 상태입니다.
 */

export const useObserver = ({
  threshold = 0.0,
  hasNextPage,
  fetchNextPage,
  isFetching,
}: UseObserverProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    // target이 화면에 관찰되고, 다음페이지가 있다면 다음페이지를 호출
    if (entries[0].isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!targetRef.current) return undefined;

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [threshold, observerCallback]);

  return { targetRef };
};
