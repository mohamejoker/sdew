
import { ReportData } from './types';
import { salesReportGenerator } from './salesReportGenerator';
import { performanceReportGenerator } from './performanceReportGenerator';
import { behaviorReportGenerator } from './behaviorReportGenerator';
import { reportExporter } from './reportExporter';

export class ReportGenerator {
  async generateSalesReport(startDate: Date, endDate: Date): Promise<ReportData> {
    return salesReportGenerator.generateReport(startDate, endDate);
  }

  async generatePerformanceReport(): Promise<ReportData> {
    return performanceReportGenerator.generateReport();
  }

  async generateUserBehaviorReport(): Promise<ReportData> {
    return behaviorReportGenerator.generateReport();
  }

  exportToPDF(reportData: ReportData): string {
    return reportExporter.exportToPDF(reportData);
  }

  exportToExcel(reportData: ReportData): string {
    return reportExporter.exportToExcel(reportData);
  }
}

export const reportGenerator = new ReportGenerator();
export type { ReportData };
