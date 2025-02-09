import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface InventoryChartProps {
  data: Array<{
    product: string
    quantity: number
  }>
  warehouse: string
}

export function InventoryChart({ data }: InventoryChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}