// src/app/(dashboard)/inventory/page.tsx
'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { columns } from './columns'

export default function InventoryPage() {
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Product A', sku: 'SKU001', quantity: 100, warehouse: 'Warehouse 1', category: 'Electronics', lastUpdated: '2023-05-01' },
    { id: '2', name: 'Product B', sku: 'SKU002', quantity: 150, warehouse: 'Warehouse 2', category: 'Clothing', lastUpdated: '2023-05-02' },
    { id: '3', name: 'Product C', sku: 'SKU003', quantity: 75, warehouse: 'Warehouse 1', category: 'Home Goods', lastUpdated: '2023-05-03' },
    { id: '4', name: 'Product D', sku: 'SKU004', quantity: 200, warehouse: 'Warehouse 3', category: 'Electronics', lastUpdated: '2023-05-04' },
    { id: '5', name: 'Product E', sku: 'SKU005', quantity: 50, warehouse: 'Warehouse 2', category: 'Clothing', lastUpdated: '2023-05-05' },
  ])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>
      <DataTable columns={columns} data={inventory} />
    </div>
  )
}