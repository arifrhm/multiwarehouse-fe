'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { columns } from './columns'

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState([
    { id: '1', trackingNumber: 'SHP001', status: 'In Transit', origin: 'New York', destination: 'Los Angeles', estimatedDelivery: '2023-05-15' },
    { id: '2', trackingNumber: 'SHP002', status: 'Delivered', origin: 'Chicago', destination: 'Miami', estimatedDelivery: '2023-05-10' },
    { id: '3', trackingNumber: 'SHP003', status: 'Processing', origin: 'Seattle', destination: 'Houston', estimatedDelivery: '2023-05-20' },
    { id: '4', trackingNumber: 'SHP004', status: 'In Transit', origin: 'Boston', destination: 'San Francisco', estimatedDelivery: '2023-05-18' },
    { id: '5', trackingNumber: 'SHP005', status: 'Delayed', origin: 'Denver', destination: 'Atlanta', estimatedDelivery: '2023-05-22' },
  ])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Shipment
        </Button>
      </div>
      <DataTable columns={columns} data={shipments} />
    </div>
  )
}
