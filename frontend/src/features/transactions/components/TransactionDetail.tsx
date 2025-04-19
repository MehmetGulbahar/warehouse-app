import { Transaction } from '../hooks/useTransactions';
import { ArrowDown, ArrowUp, Check, Clock, X, Calendar, Package, User, DollarSign, Barcode } from 'lucide-react';

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
    <div className="overflow-hidden bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {transaction.type === 'incoming' ? (
              <ArrowDown className="mr-3 w-8 h-8 text-green-500" />
            ) : (
              <ArrowUp className="mr-3 w-8 h-8 text-red-500" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
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
              <Package className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Product</p>
                <p className="text-sm text-gray-900">{transaction.productName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Barcode className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">SKU</p>
                <p className="text-sm text-gray-900">{transaction.productSku}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm text-gray-900">{formatDate(new Date(transaction.transactionDate))}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Package className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Quantity</p>
                <p className="text-sm text-gray-900">{transaction.quantity}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Price</p>
                <p className="text-sm text-gray-900">${transaction.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="mr-3 w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {transaction.type === 'incoming' ? 'Supplier' : 'Customer'}
                </p>
                <p className="text-sm text-gray-900">{transaction.partyName}</p>
              </div>
            </div>
          </div>
        </div>
        
        {transaction.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">Notes</p>
            <p className="text-sm text-gray-900">{transaction.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};