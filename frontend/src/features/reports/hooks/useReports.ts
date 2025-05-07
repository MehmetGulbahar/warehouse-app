"use client";

import { useState, useEffect } from 'react';

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
    id: 'totalStockValue',
    title: 'Total Stock Value',
    value: 0, 
    change: 12.5,
    trend: 'up',
    type: 'inventory',
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [100000, 105000, 110000, 115000, 120000, 125000],
    },
  },
  {
    id: 'monthlyTransactionCount',
    title: 'Monthly Transaction Count',
    value: 245,
    change: -5.2,
    trend: 'down',
    type: 'transactions',
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [200, 220, 240, 230, 250, 245],
    },
  },
  {
    id: 'averageStockIn',
    title: 'Average Stock In',
    value: 45,
    change: 8.3,
    trend: 'up',
    type: 'inventory',
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [40, 42, 43, 44, 45, 45],
    },
  },
  {
    id: 'transactionValue',
    title: 'Transaction Value',
    value: 78500,
    change: 15.2,
    trend: 'up',
    type: 'transactions',
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
  const [reportData, setReportData] = useState<ReportData[]>([...mockReportData]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchTotalStock(),
          fetchTransactionStats()
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching report data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [filters]);

  const fetchTotalStock = async () => {
    try {
      const response = await fetch('http://localhost:5210/api/inventory/totalstock', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch total stock data');
      }
      
      const data = await response.json();
      
      const stockValue = typeof data === 'number' 
        ? data 
        : (data.totalStock || data.total || data.count || data.value || Object.values(data)[0]);
      
      setReportData(prevData => 
        prevData.map(item => 
          item.id === 'totalStockValue' ? { ...item, value: stockValue } : item
        )
      );
    } catch (err) {
      console.error('Error fetching total stock for reports:', err);
    }
  };

  const fetchTransactionStats = async () => {
    try {
     

      const currentEndDate = filters.endDate;
      const currentStartDate = filters.startDate;
      
      const periodLength = currentEndDate.getTime() - currentStartDate.getTime();
      const prevEndDate = new Date(currentStartDate.getTime() - 1); 
      const prevStartDate = new Date(prevEndDate.getTime() - periodLength);

      const queryParams = new URLSearchParams({
        currentStartDate: currentStartDate.toISOString(),
        currentEndDate: currentEndDate.toISOString(),
        prevStartDate: prevStartDate.toISOString(),
        prevEndDate: prevEndDate.toISOString()
      });

      const response = await fetch(`http://localhost:5210/api/transaction/stats?${queryParams}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch transaction statistics');
      }
      
      const data = await response.json();
      
      setReportData(prevData => 
        prevData.map(item => {
          if (item.id === 'transactionValue') {
            const currentValue = data.currentPeriod?.totalValue || item.value;
            const prevValue = data.previousPeriod?.totalValue || 0;
            const changePercent = prevValue === 0 ? 0 : ((currentValue - prevValue) / prevValue) * 100;
            
            return {
              ...item,
              value: currentValue,
              change: parseFloat(changePercent.toFixed(1)),
              trend: changePercent >= 0 ? 'up' : 'down'
            };
          }
          return item;
        })
      );
    } catch (err) {
      console.error('Error fetching transaction statistics:', err);
    }
  };

  const updateFilters = (newFilters: Partial<ReportFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getReportData = (): ReportData[] => {
    if (filters.type === 'all') {
      return reportData;
    }
    
    return reportData.filter(report => report.type === filters.type);
  };

  return {
    filters,
    updateFilters,
    reportData: getReportData(),
    loading,
    error,
  };
};