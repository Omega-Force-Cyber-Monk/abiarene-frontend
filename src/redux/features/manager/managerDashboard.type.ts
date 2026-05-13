export type ManagerOverview = {
  dailySales: number;
  sales: {
    today: number;
    previousDay: number;
    changePercentage: number;
  };
  transactions: {
    total: number;
    today: number;
    previousDay: number;
    changePercentage: number;
  };
  discounts: {
    activeCount: number;
  };
  meta: {
    currency: string;
    comparedAt: string;
    todayStart: string;
    previousDayStart: string;
  };
};

export type StockAlert = {
  id: string;
  tenantId: string;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  createdAt: string;
  updatedAt: string;
  shortage: number;
};

export type StockAlertsResponse = {
  data: StockAlert[];
  meta: {
    count: number;
  };
};
