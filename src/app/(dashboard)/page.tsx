'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InventoryChart } from '@/components/warehouse/InventoryChart'
import { OrdersTable } from '@/components/warehouse/OrdersTable'
import { StockAlerts } from '@/components/warehouse/StockAlerts'
import { WarehouseStats } from '@/components/warehouse/WarehouseStats'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WarehouseManagerDashboard() {
  const [selectedWarehouse, setSelectedWarehouse] = useState('all')

  const dummyData = {
    stats: {
      totalInventory: 10000,
      lowStockItems: 15,
      incomingShipments: 5,
      outgoingOrders: 20
    },
    inventory: [
      { product: 'Product A', quantity: 500 },
      { product: 'Product B', quantity: 300 },
      { product: 'Product C', quantity: 700 }
    ],
    recentOrders: [
      { id: '1', product: 'Product A', quantity: 50, date: '2023-04-01' },
      { id: '2', product: 'Product B', quantity: 30, date: '2023-04-02' },
      { id: '3', product: 'Product C', quantity: 20, date: '2023-04-03' }
    ],
    stockAlerts: [
      { product: 'Product D', currentStock: 10, threshold: 20 },
      { product: 'Product E', currentStock: 5, threshold: 15 }
    ]
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Warehouse Manager Dashboard</h1>
      
      <div className="mb-4">
        <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            <SelectItem value="warehouse1">Warehouse 1</SelectItem>
            <SelectItem value="warehouse2">Warehouse 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <WarehouseStats data={dummyData.stats} />
      
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <InventoryChart data={dummyData.inventory} warehouse={selectedWarehouse} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersTable orders={dummyData.recentOrders} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Stock Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <StockAlerts alerts={dummyData.stockAlerts} />
        </CardContent>
      </Card>
    </div>
  )
}