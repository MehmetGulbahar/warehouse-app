import { Transaction } from '../hooks/useTransactions';
import { FiArrowDown, FiArrowUp, FiCheck, FiClock, FiX, FiCalendar, FiPackage, FiUser } from 'react-icons/fi';

interface TransactionDetailProps {
  transaction: Transaction;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <FiCheck className="w-4 h-4" />;
    case 'pending':
      return <FiClock className="w-4 h-4" />;
    case 'cancelled':
      return <FiX className="w-4 h-4" />;
    default:
      return null;
  }
};

export const TransactionDetail = ({ transaction }: TransactionDetailProps) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {transaction.type === 'incoming' ? (
              <FiArrowDown className="mr-3 w-8 h-8 text-green-500" />
            ) : (
              <FiArrowUp className="mr-3 w-8 h-8 text-red-500" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {transaction.type === 'incoming' ? 'Gelen Stok' : 'Çıkan Stok'}
            </h2>
          </div>
          <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
            <div className="flex items-center">
              {getStatusIcon(transaction.status)}
              <span className="ml-1">{transaction.status}</span>
            </div>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center">
              <FiPackage className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Ürün</p>
                <p className="text-sm text-gray-900">{transaction.productName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiCalendar className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Tarih</p>
                <p className="text-sm text-gray-900">{new Date(transaction.date).toLocaleDateString('tr-TR')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <FiPackage className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Miktar</p>
                <p className="text-sm text-gray-900">{transaction.quantity}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiUser className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {transaction.type === 'incoming' ? 'Tedarikçi' : 'Müşteri'}
                </p>
                <p className="text-sm text-gray-900">
                  {transaction.type === 'incoming' ? transaction.supplier : transaction.customer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 