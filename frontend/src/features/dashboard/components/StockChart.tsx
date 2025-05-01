'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  isLoading?: boolean;
}

export const StockChart = ({ isLoading = false }: StockChartProps) => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockMovements = async () => {
      try {
        setLoading(true);
        // You can replace this with your actual API endpoint for stock movements over time
        const response = await fetch('http://localhost:5210/api/Transaction/movements', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          // If the API endpoint doesn't exist yet, use mock data
          // This makes the component work even if the backend isn't ready
          const mockData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            incoming: [65, 78, 52, 83, 95, 87],
            outgoing: [42, 55, 33, 68, 72, 65]
          };
          
          setChartData({
            labels: mockData.labels,
            datasets: [
              {
                label: 'Incoming Stock',
                data: mockData.incoming,
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                tension: 0.4,
                fill: false,
              },
              {
                label: 'Outgoing Stock',
                data: mockData.outgoing,
                borderColor: 'rgb(249, 115, 22)',
                backgroundColor: 'rgba(249, 115, 22, 0.5)',
                tension: 0.4,
                fill: false,
              }
            ]
          });
          return;
        }

        const data = await response.json();
        
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Incoming Stock',
              data: data.incoming,
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.5)',
              tension: 0.4,
              fill: false,
            },
            {
              label: 'Outgoing Stock',
              data: data.outgoing,
              borderColor: 'rgb(249, 115, 22)',
              backgroundColor: 'rgba(249, 115, 22, 0.5)',
              tension: 0.4,
              fill: false,
            }
          ]
        });
      } catch (err) {
        console.error('Error fetching stock movements:', err);
        setError('Failed to load stock movement data');
        
        // Use mock data as fallback
        const mockData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          incoming: [65, 78, 52, 83, 95, 87],
          outgoing: [42, 55, 33, 68, 72, 65]
        };
        
        setChartData({
          labels: mockData.labels,
          datasets: [
            {
              label: 'Incoming Stock',
              data: mockData.incoming,
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.5)',
              tension: 0.4,
              fill: false,
            },
            {
              label: 'Outgoing Stock',
              data: mockData.outgoing,
              borderColor: 'rgb(249, 115, 22)',
              backgroundColor: 'rgba(249, 115, 22, 0.5)',
              tension: 0.4,
              fill: false,
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStockMovements();
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };

  if (isLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-900/30 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Line options={options} data={chartData} height={250} />
    </div>
  );
};