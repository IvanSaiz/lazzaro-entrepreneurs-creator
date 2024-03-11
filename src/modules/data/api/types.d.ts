declare type EntityType = "Product" | "Event" | "Project" | "Service";

declare type DashboardData = {
  articles: number;
  earnings: number;
  earningsByMonth: Record<string, number>;
  earningsByEntityType: Record<EntityType, number>;
  events: number;
  portfolio: number;
  reservations: number;
  services: number;
  reviews: number;
};
