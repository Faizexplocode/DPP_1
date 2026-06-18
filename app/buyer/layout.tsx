import { OrderProvider } from "@/app/context/order-context";
import { ToastProvider } from "@/app/components/ui/toast";
import RoleAppShell from "@/app/components/layout/role-app-shell";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderProvider>
      <ToastProvider>
        <RoleAppShell role="buyer">{children}</RoleAppShell>
      </ToastProvider>
    </OrderProvider>
  );
}
