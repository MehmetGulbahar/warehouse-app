import { ReportData } from '../hooks/useReports';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface ReportCardProps {
  report: ReportData;
  isLoading?: boolean;
}

export const ReportCard = ({ report, isLoading = false }: ReportCardProps) => {
  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `₺${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const trendColor = report.trend === 'up' ? '#10b981' : '#f43f5e';

  const renderChart = () => {
    if (!report.chartData) return null;
    
    const values = report.chartData.values;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;
    

    const normalizedValues = values.map(val => 
      range > 0 ? ((val - min) / range) * 100 : 50
    );
    
    return (
      <div className="flex items-end justify-between h-20 px-1 pb-1 mt-4">
        {normalizedValues.map((height, index) => (
          <div 
            key={index} 
            className="flex-1 mx-0.5 rounded-t-md"
            style={{ 
              height: `${Math.max(10, height)}%`, 
              backgroundColor: trendColor,
              opacity: 0.7 + (index / (normalizedValues.length * 2)), 
              minWidth: '4px'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 transition-shadow duration-200 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{report.title}</h3>
        <div className={`flex items-center ${report.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {report.trend === 'up' ? (
            <FiTrendingUp className="w-5 h-5" />
          ) : (
            <FiTrendingDown className="w-5 h-5" />
          )}
          <span className="ml-1 text-sm font-medium">
            {report.change > 0 ? '+' : ''}{report.change}%
          </span>
        </div>
      </div>
      
      <div className="mb-2 text-3xl font-semibold text-gray-900 dark:text-white">
        {isLoading ? (
          <div className="w-24 h-9 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        ) : (
          formatValue(report.value)
        )}
      </div>

      {/* Basitleştirilmiş özel grafik */}
      {isLoading ? (
        <div className="flex items-end justify-between h-20 px-1 pb-1 mt-4">
          {Array(6).fill(0).map((_, index) => (
            <div 
              key={index} 
              className="flex-1 mx-0.5 rounded-t-md bg-gray-200 dark:bg-gray-700 animate-pulse"
              style={{ 
                height: `${Math.random() * 60 + 20}%`,
                minWidth: '4px'
              }}
            />
          ))}
        </div>
      ) : (
        renderChart()
      )}
      
      {/* Grafik altında dönemler (opsiyonel) */}
      {report.chartData && (
        <div className="flex justify-between px-1 mt-1">
          {report.chartData.labels.map((label, index) => (
            <div key={index} className="text-xs text-gray-400 dark:text-gray-500 flex-1 text-center mx-0.5 truncate">
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};