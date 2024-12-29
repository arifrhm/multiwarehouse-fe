import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Report } from '../types'

interface ReportListProps {
  reports: Report[]
  onEdit: (report: Report) => void
  onDelete: (id: number) => void
}

export function ReportList({ reports, onEdit, onDelete }: ReportListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Program</TableHead>
          <TableHead>Jumlah Penerima</TableHead>
          <TableHead>Wilayah</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.program || 'Program belum dipilih'}</TableCell>
            <TableCell>{report.recipients}</TableCell>
            <TableCell>
              {report.province && report.district && report.subdistrict
                ? `${report.province}, ${report.district}, ${report.subdistrict}`
                : 'Wilayah belum diisi'}
            </TableCell>
            <TableCell>{report.status}</TableCell>
            <TableCell>
              <Button variant="outline" className="mr-2" onClick={() => onEdit(report)}>
                Lihat
              </Button>
              {report.status === 'Pending' && (
                <Button variant="destructive" onClick={() => onDelete(report.id)}>
                  Hapus
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

