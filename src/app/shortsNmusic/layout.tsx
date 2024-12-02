export default function MindDiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-4 w-full h-full">{children}</div>;
}
