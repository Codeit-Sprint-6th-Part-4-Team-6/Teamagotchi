export default function UpdateTeam({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto flex w-343 flex-col items-center justify-center pt-100 md:w-460">
      <h2 className="pb-24 text-24 font-medium text-text-primary md:pb-80">{title}</h2>
      {children}
    </div>
  );
}
