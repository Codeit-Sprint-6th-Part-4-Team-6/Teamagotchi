export default function UpdateTeam({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto flex w-343 flex-col items-center justify-center pt-40 md:w-460 md:pt-100">
      <h1 className="pb-24 text-2xl font-medium text-text-primary md:pb-80 md:text-32">{title}</h1>
      {children}
    </div>
  );
}
