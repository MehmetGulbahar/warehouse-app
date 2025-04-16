import { useState } from 'react';

export interface ReportFilter {
  startDate: Date;
  endDate: Date;
  type: 'all' | 'inventory' | 'transactions';
  category?: string;
}

export interface ReportData {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  type: 'inventory' | 'transactions';
  chartData?: {
    labels: string[];
    values: number[];
  };
}

const mockReportData: ReportData[] = [
  {
    id: '1',
    title: 'Total Stock Value',
    value: 125000,
    change: 12.5,
    trend: 'up',
    type: 'inventory',
    chartData: {
      labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
      values: [100000, 105000, 110000, 115000, 120000, 125000],
    },
  },
  {
    id: '2',
    title: 'Monthly Transaction Count',
    value: 245,
    change: -5.2,
    trend: 'down',
    type: 'transactions',
    chartData: {
      labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
      values: [200, 220, 240, 230, 250, 245],
    },
  },
  {
    id: '3',
    title: 'Average Stock In',
    value: 45,
    change: 8.3,
    trend: 'up',
    type: 'inventory',
    chartData: {
      labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
      values: [40, 42, 43, 44, 45, 45],
    },
  },
  {
    id: '4',
    title: 'Transaction Value',
    value: 78500,
    change: 15.2,
    trend: 'up',
    type: 'transactions',
    chartData: {
      labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
      values: [60000, 65000, 68000, 72000, 75000, 78500],
    },
  },
];

export const useReports = () => {
  const [filters, setFilters] = useState<ReportFilter>({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
    type: 'all',
  });

  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const updateFilters = (newFilters: Partial<ReportFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getReportData = (): ReportData[] => {
    if (filters.type === 'all') {
      return mockReportData;
    }
    
    return mockReportData.filter(report => report.type === filters.type);
  };

  return {
    filters,
    updateFilters,
    reportData: getReportData(),
    loading,
    error,
  };
}; 