import { IconWhiteEgg } from "@utils/icon";

export default function TeamDefault({ type }: { type: "list" | "edit" }) {
  const circleSize = type === "list" ? "size-45 md:size-50" : "size-66";
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 border-solid border-background-tertiary bg-background-secondary ${circleSize}`}
    >
      <IconWhiteEgg />
    </div>
  );
}
