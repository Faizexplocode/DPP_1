export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="screen gradient-auth-bg px-8 pt-12 pb-14 flex flex-col overflow-y-auto">
      {children}
    </div>
  );
}
