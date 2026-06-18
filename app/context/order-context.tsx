'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Order, OrderStage } from '@/app/types';
import { orders as initialOrders } from '@/app/lib/mock-data';

// ── Context value shape ─────────────────────────────────────

interface OrderContextValue {
  ordersState: Record<string, Order>;
  getOrder: (id: string) => Order | undefined;
  updateOrderStage: (id: string, stage: OrderStage) => void;
  changePackaging: (id: string, delta: number) => void;
  changeServings: (id: string, delta: number) => void;
  getActiveOrders: () => Order[];
  getTodayOrders: () => Order[];
  getUpcomingOrders: () => Order[];
  getHistoryOrders: () => Order[];
}

const OrderContext = createContext<OrderContextValue | null>(null);

// ── Provider ────────────────────────────────────────────────

export function OrderProvider({ children }: { children: ReactNode }) {
  const [ordersState, setOrdersState] =
    useState<Record<string, Order>>(initialOrders);

  const getOrder = useCallback(
    (id: string): Order | undefined => ordersState[id],
    [ordersState],
  );

  const updateOrderStage = useCallback(
    (id: string, stage: OrderStage) => {
      setOrdersState((prev) => {
        const order = prev[id];
        if (!order) return prev;
        return { ...prev, [id]: { ...order, stage } };
      });
    },
    [],
  );

  const changePackaging = useCallback(
    (id: string, delta: number) => {
      setOrdersState((prev) => {
        const order = prev[id];
        if (!order) return prev;
        const next = Math.max(0, Math.min(order.target, order.packaged + delta));
        if (next === order.packaged) return prev;
        return { ...prev, [id]: { ...order, packaged: next } };
      });
    },
    [],
  );

  const changeServings = useCallback(
    (id: string, delta: number) => {
      setOrdersState((prev) => {
        const order = prev[id];
        if (!order) return prev;
        const next = Math.max(1, order.servings + delta);
        if (next === order.servings) return prev;
        return { ...prev, [id]: { ...order, servings: next } };
      });
    },
    [],
  );

  const getActiveOrders = useCallback(
    (): Order[] =>
      Object.values(ordersState).filter(
        (o) => o.stage !== 'done' && o.stage !== 'upcoming',
      ),
    [ordersState],
  );

  const getTodayOrders = useCallback(
    (): Order[] => Object.values(ordersState).filter((o) => o.today === true),
    [ordersState],
  );

  const getUpcomingOrders = useCallback(
    (): Order[] => Object.values(ordersState).filter((o) => o.today === false),
    [ordersState],
  );

  const getHistoryOrders = useCallback(
    (): Order[] =>
      Object.values(ordersState).filter((o) => o.stage === 'done'),
    [ordersState],
  );

  const value = useMemo<OrderContextValue>(
    () => ({
      ordersState,
      getOrder,
      updateOrderStage,
      changePackaging,
      changeServings,
      getActiveOrders,
      getTodayOrders,
      getUpcomingOrders,
      getHistoryOrders,
    }),
    [
      ordersState,
      getOrder,
      updateOrderStage,
      changePackaging,
      changeServings,
      getActiveOrders,
      getTodayOrders,
      getUpcomingOrders,
      getHistoryOrders,
    ],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

// ── Hook ────────────────────────────────────────────────────

export function useOrders(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return ctx;
}
