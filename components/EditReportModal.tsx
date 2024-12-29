import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Report } from '@/types'
import Link from 'next/link'

interface EditReportModalProps {
  report: Report
  onClose: () => void
  onUpdate: (report: Report) => void
}

export function EditReportModal({ report, onClose, onUpdate }: EditReportModalProps) {
  const [editedReport, setEditedReport] = useState(report)
  const [proofUrl, setProofUrl] = useState<string | null>(null)

  useEffect(() => {
    if (editedReport.proof instanceof File) {
      const url = URL.createObjectURL(editedReport.proof)
      setProofUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setProofUrl(null)
    }
  }, [editedReport.proof])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedReport(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEditedReport(prev => ({ ...prev, proof: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedReport)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Laporan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="program" className="text-right">
                Program
              </Label>
              <Select
                onValueChange={(value) => setEditedReport(prev => ({ ...prev, program: value }))}
                value={editedReport.program}
                disabled={report.status !== 'Pending'}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih program" />
                </SelectTrigger>
                <SelectContent>
                  {['PKH', 'BLT', 'Bansos'].map((program) => (
                    <SelectItem key={program} value={program}>{program}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipients" className="text-right">
                Jumlah Penerima
              </Label>
              <Input
                id="recipients"
                name="recipients"
                type="number"
                value={editedReport.recipients}
                onChange={handleChange}
                className="col-span-3"
                disabled={report.status !== 'Pending'}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="distributionDate" className="text-right">
                Tanggal Penyaluran
              </Label>
              <Input
                id="distributionDate"
                name="distributionDate"
                type="date"
                value={editedReport.distributionDate}
                onChange={handleChange}
                className="col-span-3"
                disabled={report.status !== 'Pending'}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="proof" className="text-right">
                Bukti Penyaluran
              </Label>
              <div className="col-span-3">
                {proofUrl ? (
                  <Link href={proofUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Lihat Bukti Penyaluran
                  </Link>
                ) : (
                  <span>Tidak ada file</span>
                )}
                {report.status === 'Pending' && (
                  <Input
                    id="proof"
                    name="proof"
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="mt-2"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Catatan
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={editedReport.notes}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={report.status !== 'Pending'}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

