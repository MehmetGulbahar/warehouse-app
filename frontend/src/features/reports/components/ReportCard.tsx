import { ReportData } from '../hooks/useReports';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ReportCardProps {
  report: ReportData;
  isLoading?: boolean;
}

export const ReportCard = ({ report, isLoading = false }: ReportCardProps) => {
  const { t, i18n } = useTranslation();
  
  const formatValue = (value: number) => {
    const currentLanguage = i18n.language;
    const currencySymbol = '₺';
    
    if (value >= 1000) {
      if (currentLanguage === 'de') {
        return `${currencySymbol}${(value / 1000).toFixed(1).replace('.', ',')}T`;
      } else if (currentLanguage === 'tr') {
        return `${currencySymbol}${(value / 1000).toFixed(1).replace('.', ',')}B`;
      } else {
        return `${currencySymbol}${(value / 1000).toFixed(1)}K`;
      }
    }
    
    if (currentLanguage === 'de' || currentLanguage === 'tr') {
      return `${currencySymbol}${value.toString().replace('.', ',')}`;
    }
    
    return `${currencySymbol}${value.toString()}`;
  };

  const getChartColors = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? {
          fill: 'rgba(5, 150, 105, 0.1)',
          stroke: '#059669',
          gradient: {
            start: '#059669',
            end: '#10b981'
          }
        }
      : {
          fill: 'rgba(220, 38, 38, 0.1)',
          stroke: '#dc2626',
          gradient: {
            start: '#dc2626',
            end: '#ef4444'
          }
        };
  };

  const renderChart = () => {
    if (!report.chartData) return null;
    
    const chartData = report.chartData.labels.map((label, index) => ({
      name: t(`reports.periods.${label}`),
      value: report.chartData?.values[index] ?? 0
    }));

    const colors = getChartColors(report.trend);
    
    return (
      <div className="h-48 mt-4 min-w-[200px]">
        <ResponsiveContainer width="100%" height={192}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`color-${report.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.gradient.start} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.gradient.end} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              hide={true}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff',
                fontSize: '12px',
                padding: '8px 12px'
              }}
              formatter={(value: number) => [formatValue(value), '']}
              cursor={{ stroke: colors.stroke, strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.stroke}
              fillOpacity={1}
              fill={`url(#color-${report.id})`}
              strokeWidth={2}
              dot={{ fill: colors.stroke, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: colors.stroke }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="p-6 transition-all duration-200 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t(`reports.${report.id}`)}
        </h3>
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
          <div className="w-24 bg-gray-200 rounded h-9 dark:bg-gray-700 animate-pulse"></div>
        ) : (
          formatValue(report.value)
        )}
      </div>

      {/* Loading state for chart */}
      {isLoading ? (
        <div className="h-48 mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      ) : (
        renderChart()
      )}
    </div>
  );
};