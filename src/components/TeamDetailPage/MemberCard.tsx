import NameTag from "@components/commons/NameTag";

export default function MemberCard({
  name,
  email,
  image,
  onClick,
}: {
  name: string;
  email: string;
  image: string | null;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex h-73 cursor-pointer items-center rounded-16 bg-background-secondary px-24 py-2 transition-all hover:scale-105 hover:bg-background-tertiary"
      onClick={onClick}
    >
      <div>
        <NameTag type="email" name={name} email={email} image={image} />
      </div>
    </div>
  );
}
