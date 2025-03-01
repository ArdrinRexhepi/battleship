export default function ModeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-200/75 ">
      {children}
    </main>
  );
}
