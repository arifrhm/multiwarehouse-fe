export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: Date;
}

export interface EmployeeFormData {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
}
