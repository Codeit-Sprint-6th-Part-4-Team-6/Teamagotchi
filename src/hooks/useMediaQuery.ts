import { useEffect, useState } from "react";

function useMediaQuery() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryLists = {
      mobile: window.matchMedia("(max-width: 743px)"),
      tablet: window.matchMedia("(min-width: 744px) and (max-width: 1199px)"),
      desktop: window.matchMedia("(min-width: 1200px)"),
    };

    const handleMediaQueryChange = () => {
      setIsMobile(mediaQueryLists.mobile.matches);
      setIsTablet(mediaQueryLists.tablet.matches);
      setIsDesktop(mediaQueryLists.desktop.matches);
    };

    handleMediaQueryChange();

    Object.values(mediaQueryLists).forEach((mql) => {
      mql.addEventListener("change", handleMediaQueryChange);
    });

    return () => {
      Object.values(mediaQueryLists).forEach((mql) => {
        mql.removeEventListener("change", handleMediaQueryChange);
      });
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
}

export default useMediaQuery;
