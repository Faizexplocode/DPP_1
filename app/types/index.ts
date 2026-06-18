// ============================================================
// PawonSync - TypeScript Type Definitions
// ============================================================

export type OrderStage =
  | "waiting"
  | "accepted"
  | "cooking"
  | "packing"
  | "delivery"
  | "ready"
  | "done"
  | "upcoming";

export type UserRole = "seller" | "buyer";

export interface Order {
  id: string;
  title: string;
  customer: string;
  seller: string;
  servings: number;
  unit: string;
  date: string;
  time: string;
  location: string;
  stage: OrderStage;
  eta: string;
  progressText: string;
  packaged: number;
  target: number;
  today: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  orderId?: string;
  type: "update" | "photo" | "confirmed" | "created";
}

export interface UserProfile {
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  address: string;
  businessName?: string;
}

export interface TimelineStage {
  key: string;
  label: string;
  time?: string;
}

export interface Ingredient {
  name: string;
  perServing: number;
  unit: string;
}
