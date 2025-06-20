
export class ServiceCalculator {
  calculateFinalPrice(providerPrice: number, profitMargin: number): number {
    return Number((providerPrice * (1 + profitMargin / 100)).toFixed(2));
  }

  calculateProfit(providerPrice: number, quantity: number, profitMargin: number): number {
    const finalPrice = this.calculateFinalPrice(providerPrice, profitMargin);
    return Number(((finalPrice - providerPrice) * quantity).toFixed(2));
  }
}

export const serviceCalculator = new ServiceCalculator();
