import { useEffect, useState } from "react";
import dimensions from "../styles/dimensions.module.scss";

export const useScreenSize = (
  mediumScreenWidthInRem?: number,
  largeScreenWidthInRem?: number
) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mediumScreenWidth =
    (mediumScreenWidthInRem
      ? mediumScreenWidthInRem
      : +dimensions.mediumScreenMinWidth) * 16;
  const largeScreenWidth =
    (largeScreenWidthInRem
      ? largeScreenWidthInRem
      : +dimensions.largeScreenMinWidth) * 16;

  const isSmall = () => {
    if (windowDimensions.width < mediumScreenWidth) {
      return true;
    }
    return false;
  };

  const isMedium = () => {
    if (
      windowDimensions.width >= mediumScreenWidth &&
      windowDimensions.width < largeScreenWidth
    ) {
      return true;
    }
    return false;
  };

  const isLarge = () => {
    if (windowDimensions.width >= largeScreenWidth) {
      return true;
    }
    return false;
  };

  return { isLarge, isMedium, isSmall };
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
