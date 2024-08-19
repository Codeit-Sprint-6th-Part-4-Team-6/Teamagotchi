import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import errorAnimation from "../../../../public/lottie/animation_error.json";
import loadingAnimation from "../../../../public/lottie/animation_loading.json";
import successAnimation from "../../../../public/lottie/animation_success.json";

type Props = {
  type: "loading" | "error" | "success";
  size: number;
};

export default function LottieAnimation({ type, size }: Props) {
  const getAnimationSource = () => {
    switch (type) {
      case "loading":
        return loadingAnimation;
      case "error":
        return errorAnimation;
      case "success":
        return successAnimation;
      default:
        return loadingAnimation;
    }
  };

  return (
    <Player
      autoplay
      loop
      src={getAnimationSource()}
      style={{ height: `${size}px`, width: `${size}px` }}
    />
  );
}
