
import { ServiceOrder, ServiceStats } from './types';

export class ServiceStatsCalculator {
  calculateStats(orders: ServiceOrder[], totalServices: number, activeServices: number): ServiceStats {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.finalPrice, 0);
    const totalProfit = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.profit, 0);

    return {
      totalOrders,
      completedOrders,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalProfit: Number(totalProfit.toFixed(2)),
      conversionRate: totalOrders > 0 ? Number(((completedOrders / totalOrders) * 100).toFixed(1)) : 0,
      activeServices,
      totalServices
    };
  }
}

export const serviceStatsCalculator = new ServiceStatsCalculator();
