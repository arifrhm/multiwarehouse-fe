interface StockAlert {
  product: string
  currentStock: number
  threshold: number
}

interface StockAlertsProps {
  alerts: StockAlert[]
}

export function StockAlerts({ alerts }: StockAlertsProps) {
  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-700">{alert.product}</h3>
          <p className="text-sm text-red-600">
            Current Stock: {alert.currentStock} (Below threshold of {alert.threshold})
          </p>
        </div>
      ))}
    </div>
  )
}