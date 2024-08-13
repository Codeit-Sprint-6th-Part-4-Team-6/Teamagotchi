import NameTag from "@components/commons/NameTag";

export default function MemberCard({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string | null;
}) {
  return (
    <div className="flex h-73 items-center rounded-16 bg-background-secondary px-24 py-20">
      <div>
        <NameTag type="email" name={name} email={email} image={image} />
      </div>
    </div>
  );
}
