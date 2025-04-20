import { Transaction } from '../hooks/useTransactions';
import { ArrowDown, ArrowUp, Check, Clock, X, Calendar, Package, User, DollarSign, Barcode } from 'lucide-react';

interface TransactionDetailProps {
  transaction: Transaction;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <Check className="w-4 h-4" />;
    case 'pending':
      return <Clock className="w-4 h-4" />;
    case 'cancelled':
      return <X className="w-4 h-4" />;
    default:
      return null;
  }
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const TransactionDetail = ({ transaction }: TransactionDetailProps) => {
  return (
    <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {transaction.type === 'incoming' ? (
              <ArrowDown className="mr-3 w-8 h-8 text-green-500" />
            ) : (
              <ArrowUp className="mr-3 w-8 h-8 text-red-500" />
            )}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {transaction.type === 'incoming' ? 'Stock In' : 'Stock Out'}
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
              <Package className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Product</p>
                <p className="text-sm text-gray-900 dark:text-gray-200">{transaction.productName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Barcode className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">SKU</p>
                <p className="text-sm text-gray-900 dark:text-gray-200">{transaction.productSku}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                <p className="text-sm text-gray-900 dark:text-gray-200">{formatDate(new Date(transaction.transactionDate))}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Package className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</p>
                <p className="text-sm text-gray-900 dark:text-gray-200">{transaction.quantity}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</p>
                <p className="text-sm text-gray-900 dark:text-gray-200">${transaction.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {transaction.type === 'incoming' ? 'Supplier' : 'Customer'}
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-200">{transaction.partyName}</p>
              </div>
            </div>
          </div>
        </div>
        
        {transaction.notes && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</p>
            <p className="text-sm text-gray-900 dark:text-gray-200">{transaction.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};