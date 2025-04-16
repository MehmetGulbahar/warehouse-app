import { Transaction } from '../hooks/useTransactions';
import { FiArrowDown, FiArrowUp, FiCheck, FiClock, FiX, FiXCircle } from 'react-icons/fi';
import { useState } from 'react';

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-500';
    case 'pending':
      return 'text-blue-600';
    case 'cancelled':
      return 'text-rose-500';
    default:
      return 'text-gray-500';
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

export const TransactionList = ({ transactions, loading, error }: TransactionListProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 rounded-full border-b-2 border-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-800 bg-red-50 rounded-lg border border-red-200">
        {error}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No transactions found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-center divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-12 py-8 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase dark:text-gray-300">
                 Transaction
                </th>
                <th scope="col" className="px-12 py-8 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase dark:text-gray-300">
                  Product
                </th>
                <th scope="col" className="px-12 py-8 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase dark:text-gray-300">
                  Quantity
                </th>
                <th scope="col" className="px-12 py-8 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase dark:text-gray-300">
                  Date
                </th>
                <th scope="col" className="px-12 py-8 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase dark:text-gray-300">
                  Status
                </th>
                <th scope="col" className="px-12 py-8 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase dark:text-gray-300">
                  {transactions[0].type === 'incoming' ? 'Supplier' : 'Customer'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className="transition-colors duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <td className="px-8 py-4 whitespace-nowrap">
                    <div className="flex justify-center items-center w-14 h-14 rounded-xl">
                      {transaction.type === 'incoming' ? (
                        <FiArrowDown className="w-6 h-6 text-green-500" />
                      ) : (
                        <FiArrowUp className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-12 py-9 whitespace-nowrap">
                    <div className="text-xl font-medium text-gray-900 dark:text-white">{transaction.productName}</div>
                  </td>
                  <td className="px-12 py-9 whitespace-nowrap">
                    <div className="text-xl text-gray-900 dark:text-white">{transaction.quantity}</div>
                  </td>
                  <td className="px-12 py-9 whitespace-nowrap">
                    <div className="text-xl text-gray-900 dark:text-white">{new Date(transaction.date).toLocaleDateString('tr-TR')}</div>
                  </td>
                  <td className="px-12 py-9 whitespace-nowrap">
                    <span className={`inline-flex items-center text-xl font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-2">{transaction.status}</span>
                    </span>
                  </td>
                  <td className="px-12 py-9 text-xl text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {transaction.type === 'incoming' ? transaction.supplier : transaction.customer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedTransaction && (
        <div className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/30">
          <div className="p-6 mx-4 w-full max-w-md bg-white rounded-2xl shadow-lg dark:bg-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedTransaction.type === 'incoming' ? 'Incoming Stock Details' : 'Outgoing Stock Details'}
              </h3>
              <button 
                onClick={() => setSelectedTransaction(null)}
                className="p-1 text-gray-400 transition-colors duration-200 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FiXCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Product</span>
                <span className="text-sm text-gray-900 dark:text-white">{selectedTransaction.productName}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</span>
                <span className="text-sm text-gray-900 dark:text-white">{selectedTransaction.quantity}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</span>
                <span className="text-sm text-gray-900 dark:text-white">{new Date(selectedTransaction.date).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTransaction.status)}`}>
                  {selectedTransaction.status}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {selectedTransaction.type === 'incoming' ? 'Supplier' : 'Customer'}
                </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {selectedTransaction.type === 'incoming' ? selectedTransaction.supplier : selectedTransaction.customer}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 