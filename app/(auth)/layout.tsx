export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="screen gradient-auth-bg p-6 flex flex-col min-h-full">
      {children}
    </div>
  );
}
