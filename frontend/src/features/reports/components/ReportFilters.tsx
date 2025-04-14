import { ReportFilter } from '../hooks/useReports';
import { FiCalendar, FiFilter } from 'react-icons/fi';

interface ReportFiltersProps {
  filters: ReportFilter;
  onFilterChange: (filters: Partial<ReportFilter>) => void;
}

export const ReportFilters = ({ filters, onFilterChange }: ReportFiltersProps) => {
  return (
    <div className="p-6 mb-8 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex justify-center items-center w-10 h-10 bg-blue-50 rounded-lg">
            <FiFilter className="w-5 h-5 text-blue-600" />
          </div>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value as 'all' | 'inventory' | 'transactions' })}
            className="block w-full sm:w-48 px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
          >
            <option value="all">All Reports</option>
            <option value="inventory">Stock Reports</option>
            <option value="transactions">Transaction Reports</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex justify-center items-center w-10 h-10 bg-blue-50 rounded-lg">
            <FiCalendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={filters.startDate.toISOString().split('T')[0]}
              onChange={(e) => onFilterChange({ startDate: new Date(e.target.value) })}
              className="block w-full sm:w-48 px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
            />
            <span className="text-gray-500">-</span>
            <input
              type="date"
              value={filters.endDate.toISOString().split('T')[0]}
              onChange={(e) => onFilterChange({ endDate: new Date(e.target.value) })}
              className="block w-full sm:w-48 px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 