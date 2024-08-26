import classNames from "classnames";
import { IconWhiteEgg } from "@utils/icon";

export default function TeamDefault({
  type,
  className,
}: {
  type?: "list" | "edit" | "popover";
  className?: string;
}) {
  const circleSize = classNames({
    "size-45 md:size-50": type === "list",
    "size-66": type === "edit",
    "size-32": type === "popover",
  });
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 border-solid border-background-tertiary bg-background-secondary ${circleSize} ${className}`}
    >
      <IconWhiteEgg />
    </div>
  );
}
