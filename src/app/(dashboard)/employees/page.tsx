// src/app/(dashboard)/employees/page.tsx
'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { columns } from './columns'

export default function EmployeesPage() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', position: 'Manager', department: 'Sales', email: 'john.doe@example.com', startDate: '2022-01-15' },
    { id: 2, name: 'Jane Smith', position: 'Developer', department: 'IT', email: 'jane.smith@example.com', startDate: '2022-03-01' },
    { id: 3, name: 'Bob Johnson', position: 'Designer', department: 'Marketing', email: 'bob.johnson@example.com', startDate: '2022-05-10' },
    { id: 4, name: 'Alice Brown', position: 'HR Specialist', department: 'Human Resources', email: 'alice.brown@example.com', startDate: '2022-07-22' },
    { id: 5, name: 'Charlie Wilson', position: 'Accountant', department: 'Finance', email: 'charlie.wilson@example.com', startDate: '2022-09-05' },
  ])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
