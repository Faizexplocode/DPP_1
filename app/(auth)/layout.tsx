export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="screen gradient-auth-bg flex flex-col overflow-hidden">
      {children}
    </div>
  );
}
