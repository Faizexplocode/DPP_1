import { OrderProvider } from "@/app/context/order-context";
import { ToastProvider } from "@/app/components/ui/toast";
import RoleAppShell from "@/app/components/layout/role-app-shell";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderProvider>
      <ToastProvider>
        <RoleAppShell role="seller">{children}</RoleAppShell>
      </ToastProvider>
    </OrderProvider>
  );
}
