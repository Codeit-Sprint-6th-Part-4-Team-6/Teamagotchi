import Image from "next/image";
import { IconMember } from "@utils/icon";

type NameTagProps = {
  type: "default" | "email" | "profile";
  image?: string;
  name: string;
  email?: string;
};

export default function NameTag({ type, image, name, email }: NameTagProps) {
  return (
    <div className="flex items-center gap-12">
      {image ? <Image src={image} alt="profile" /> : <IconMember />}
      <span className="text-xs font-medium text-text-primary md:text-md">{name}</span>
      {type === "email" && email && email}
    </div>
  );
}
