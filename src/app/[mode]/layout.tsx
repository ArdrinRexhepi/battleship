export default function ModeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      {children}
    </main>
  );
}
