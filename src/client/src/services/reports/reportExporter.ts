
import { ReportData } from './types';

export class ReportExporter {
  exportToPDF(reportData: ReportData): string {
    console.log('تصدير التقرير إلى PDF:', reportData.title);
    return `report_${Date.now()}.pdf`;
  }

  exportToExcel(reportData: ReportData): string {
    console.log('تصدير التقرير إلى Excel:', reportData.title);
    return `report_${Date.now()}.xlsx`;
  }
}

export const reportExporter = new ReportExporter();
