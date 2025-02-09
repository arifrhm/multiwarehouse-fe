"use client";

import { useState, useEffect } from "react";
import { OrdersTable } from "@/components/warehouse/OrdersTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  id: string;
  product: string;
  quantity: number;
  date: string;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      const today = new Date();
      const statuses = ["Delivered", "Pending", "Processing", "Cancelled"];
      const generatedOrders = Array.from({ length: 20 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return {
          id: (i + 1).toString(),
          product: `Product ${String.fromCharCode(65 + i % 26)}`,
          quantity: Math.floor(Math.random() * 10) + 1,
          date: date.toISOString().split('T')[0],
          status: statuses[Math.floor(Math.random() * statuses.length)]
        };
      });
      setOrders(generatedOrders);
    };
    fetchOrders();
  }, []);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => {
          if (filter === "recent") {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return new Date(order.date) >= sevenDaysAgo;
          }
          return order.status.toLowerCase() === filter;
        });

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Orders</CardTitle>
          <Select onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter orders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="recent">Recent Orders</SelectItem>
              <SelectItem value="pending">Pending Orders</SelectItem>
              <SelectItem value="delivered">Delivered Orders</SelectItem>
              <SelectItem value="processing">Processing Orders</SelectItem>
              <SelectItem value="cancelled">Cancelled Orders</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={filteredOrders} />
        </CardContent>
      </Card>
    </div>
  );
}
