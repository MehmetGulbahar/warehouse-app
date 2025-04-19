'use client'

import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Transaction as TransactionType } from '../hooks/useTransactions'

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}



interface TransactionListProps {
  transactions: TransactionType[]; 
  loading: boolean;
  error: string | null;
}

export function TransactionList({ transactions, loading, error }: TransactionListProps) {
  const [filter, setFilter] = useState<'all' | 'incoming' | 'outgoing'>('all')
  
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'incoming' ? 'default' : 'outline'}
            onClick={() => setFilter('incoming')}
          >
            Incoming
          </Button>
          <Button
            variant={filter === 'outgoing' ? 'default' : 'outline'}
            onClick={() => setFilter('outgoing')}
          >
            Outgoing
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-primary"></div>
        </div>
      ) : error ? (
        <div className="p-4 text-red-700 border border-red-200 rounded-md bg-red-50">
          {error}
        </div>
      ) : (
        <div className="border rounded-md dark:bg-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier/Customer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.type === 'incoming' ? 'success' : 'destructive'
                        }
                      >
                        {transaction.type === 'incoming' ? 'In' : 'Out'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.productName}
                    </TableCell>
                    <TableCell>{transaction.productSku}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>₺{transaction.price.toFixed(2)}</TableCell>
                    <TableCell>{formatDate(new Date(transaction.transactionDate))}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === 'completed'
                            ? 'outline'
                            : transaction.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.partyName}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}