'use client'

import React, { useState, useEffect } from 'react'
import { useTransactions, Transaction } from '../hooks/useTransactions'
import { Button } from '../../../components/ui/button'

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}


interface OutgoingTransactionFormProps {
  onSuccess?: () => void;
}

export function OutgoingTransactionForm({ onSuccess }: OutgoingTransactionFormProps) {
  const { createTransaction } = useTransactions();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const[price, setPrice] = useState(0);
  const [customer, setCustomer] = useState('');
  const [reason, setReason] = useState('sale');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5210/api/inventory', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(`Error loading products: ${err instanceof Error ? err.message : 'Unknown error'}`);
        console.error('Product loading error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const selectedProduct = products.find(p => p.id === selectedProductId);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    
    if (!selectedProductId) {
      setValidationError('Please select a product');
      return;
    }
    
    if (!selectedProduct) {
      setValidationError('Selected product not found');
      return;
    }
    
    if (quantity <= 0) {
      setValidationError('Quantity must be greater than 0');
      return;
    }
    
    if (quantity > selectedProduct.quantity) {
      setValidationError(`Not enough stock. Only ${selectedProduct.quantity} units available.`);
      return;
    }
    if (price <= 0) {
      setValidationError('Price must be greater than 0');
      return;
    }
    if (price > selectedProduct.price) {
      setValidationError(`Not enough stock. Only ${selectedProduct.price} units available.`);
      return;
    }
    
    if (!customer.trim()) {
      setValidationError('Please enter a customer name');
      return;
    }
    
    try {
      setLoading(true);
      
      const now = new Date();
      const formattedDate = now.toISOString().split('.')[0]; // Remove milliseconds
      
      // Calculate unit price (price per item)
      const unitPrice = selectedProduct.price / selectedProduct.quantity;
      
      // Calculate new total price based on remaining quantity
      const remainingQuantity = selectedProduct.quantity - quantity;
      const newTotalPrice = unitPrice * remainingQuantity;
      
      const updatedProduct = {
        ...selectedProduct,
        quantity: remainingQuantity,
        price: newTotalPrice
      };
      
      const inventoryResponse = await fetch(`http://localhost:5210/api/inventory/${selectedProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updatedProduct)
      });
      
      if (!inventoryResponse.ok) {
        const errorData = await inventoryResponse.json().catch(() => ({}));
        const errorMsg = errorData.message || 'Failed to update inventory';
        throw new Error(errorMsg);
      }
      
      function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
      const transactionId = generateUUID();
      
      // Calculate the transaction price (price of items being removed)
      const transactionPrice = unitPrice * quantity;
      
      const transactionData: Transaction = {
        id: transactionId, 
        type: 'outgoing',
        productId: selectedProductId,
        productName: selectedProduct.name,
        productSku: selectedProduct.sku,
        quantity,
        price: transactionPrice, // Use the calculated price for the transaction
        partyName: customer,
        transactionDate: formattedDate,
        status: 'completed',
        notes: `Reason: ${reason}${notes ? ' - ' + notes : ''}`
      };
      
      console.log('Creating transaction with data:', transactionData);
      await createTransaction(transactionData); 
      
      setSelectedProductId('');
      setQuantity(1);
      setCustomer('');
      setNotes('');
      setSuccess(true);
      
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError(`Error creating transaction: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Record Outgoing Stock</h2>
      
      {error && (
        <div className="p-4 mb-6 text-red-700 border border-red-200 rounded-md bg-red-50">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-4 mb-6 text-green-700 border border-green-200 rounded-md bg-green-50">
          Outgoing transaction recorded successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Product Selection */}
          <div>
            <label htmlFor="product" className="block mb-1 text-sm font-medium text-gray-700">
              Product <span className="text-red-500">*</span>
            </label>
            <select
              id="product"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id} disabled={product.quantity <= 0}>
                  {product.name} ({product.quantity} in stock)
                </option>
              ))}
            </select>
          </div>
          
          {/* Product Details */}
          {selectedProduct && (
            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <p><span className="font-medium">SKU:</span> {selectedProduct.sku}</p>
              <p><span className="font-medium">Available:</span> {selectedProduct.quantity} units</p>
              <p><span className="font-medium">Price:</span> ${selectedProduct.price.toFixed(2)}</p>
            </div>
          )}
          
          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={selectedProduct?.quantity || 1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          {/* Price */}
          <div>
            <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-700">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              min="1"
              max={selectedProduct?.price || 1}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          
          {/* Customer */}
          <div>
            <label htmlFor="customer" className="block mb-1 text-sm font-medium text-gray-700">
              Customer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="customer"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter customer name"
              disabled={loading}
            />
          </div>
          
          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block mb-1 text-sm font-medium text-gray-700">
              Reason <span className="text-red-500">*</span>
            </label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="sale">Sale</option>
              <option value="return">Return to Supplier</option>
              <option value="transfer">Warehouse Transfer</option>
              <option value="damage">Damaged/Lost</option>
              <option value="sample">Sample/Giveaway</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block mb-1 text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter any additional details"
              disabled={loading}
            />
          </div>
          
          {/* Validation error */}
          {validationError && (
            <div className="p-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">
              {validationError}
            </div>
          )}
          
          {/* Submit button */}
          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Record Outgoing Stock'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
