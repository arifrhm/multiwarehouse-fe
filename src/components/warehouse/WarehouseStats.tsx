interface WarehouseStatsProps {
  data: {
    totalInventory: number
    lowStockItems: number
    incomingShipments: number
    outgoingOrders: number
  }
}

export function WarehouseStats({ data }: WarehouseStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold text-gray-600">Total Inventory</h3>
        <p className="text-2xl font-bold">{data.totalInventory}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold text-gray-600">Low Stock Items</h3>
        <p className="text-2xl font-bold text-yellow-600">{data.lowStockItems}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold text-gray-600">Incoming Shipments</h3>
        <p className="text-2xl font-bold text-green-600">{data.incomingShipments}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold text-gray-600">Outgoing Orders</h3>
        <p className="text-2xl font-bold text-blue-600">{data.outgoingOrders}</p>
      </div>
    </div>
  )
}