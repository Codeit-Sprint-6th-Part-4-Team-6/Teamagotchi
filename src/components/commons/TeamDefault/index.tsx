import { IconWhiteEgg } from "@utils/icon";

export default function TeamDefault({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 border-solid border-background-tertiary bg-background-secondary ${className}`}
    >
      <IconWhiteEgg />
    </div>
  );
}
