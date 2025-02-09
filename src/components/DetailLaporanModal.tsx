"use client";

import { useState } from "react";
import {
  useGetLaporanByIdQuery,
  useApproveLaporanMutation,
  useRejectLaporanMutation,
} from "@/lib/slices/apiSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Perhatikan berbeda dengan sebelumnya

interface DetailLaporanModalProps {
  laporanId: string;
  onClose: () => void;
}

export function DetailLaporanModal({
  laporanId,
  onClose,
}: DetailLaporanModalProps) {
  const router = useRouter();

  // State untuk catatan penolakan
  const [alasanPenolakan, setAlasanPenolakan] = useState("");

  // Tambahkan state di komponen
  const [isDownloading, setIsDownloading] = useState(false);

  // Query detail laporan
  const { data: laporan, isLoading, error } = useGetLaporanByIdQuery(laporanId);

  // Mutation approve laporan
  const [approveLaporan, { isLoading: isApproving }] =
    useApproveLaporanMutation();

  // Mutation reject laporan
  const [rejectLaporan, { isLoading: isRejecting }] =
    useRejectLaporanMutation();

  // Handler setujui laporan
  const handleSetujui = async () => {
    try {
      await approveLaporan({ laporanId }).unwrap();

      toast.success("Laporan berhasil disetujui");
      onClose();
    } catch (error) {
      toast.error("Gagal menyetujui laporan");
    }
  };

  // Handler tolak laporan
  const handleTolak = async () => {
    // Validasi alasan penolakan
    if (!alasanPenolakan.trim()) {
      toast.warning("Harap berikan alasan penolakan");
      return;
    }

    try {
      await rejectLaporan({
        laporanId,
        alasan_penolakan: alasanPenolakan,
      }).unwrap();

      toast.success("Laporan ditolak");
      onClose();
    } catch (error) {
      toast.error("Gagal menolak laporan");
    }
  };

  // Handler download bukti
  const handleDownloadBukti = async () => {
    // Set loading true di awal
    setIsDownloading(true);

    try {
      const token = Cookies.get("token");
      // Gunakan optional chaining
      const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${
        laporan?.bukti_penyaluran ?? ""
      }`;

      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cek status response
      if (!response.ok) {
        // Jika status tidak ok, cek status khusus
        if (response.status === 401) {
          toast.error("Sesi Anda telah berakhir. Silakan login ulang.");
          router.push("/login");
        } else if (response.status === 404) {
          toast.error("Bukti penyaluran tidak ditemukan");
        } else {
          throw new Error("Gagal mengunduh file");
        }
        return;
      }

      const blob = await response.blob();
      const fileName =
        laporan?.bukti_penyaluran?.split("/").pop() || "bukti_penyaluran";

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Optional: Toast sukses
      toast.success("Bukti berhasil diunduh");
    } catch (error) {
      console.error("Download error:", error);

      // Pesan error yang lebih spesifik
      if (error instanceof TypeError) {
        toast.error("Koneksi internet bermasalah");
      } else {
        toast.error("Gagal mengunduh bukti");
      }
    } finally {
      // Pastikan loading di-set false
      setIsDownloading(false);
    }
  };

  // Loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );

  // Error state
  if (error) return <div>Gagal memuat laporan</div>;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detail Laporan</DialogTitle>
          <DialogDescription>
            Informasi lengkap laporan penyaluran bantuan
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Program</label>
              <p>{laporan?.nama_program}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Status</label>
              <Badge
                variant={
                  laporan?.status === "Disetujui"
                    ? "default"
                    : laporan?.status === "Ditolak"
                    ? "destructive"
                    : "outline"
                }
              >
                {laporan?.status}
              </Badge>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Wilayah</label>
            <p>
              {laporan?.wilayah.kecamatan}, {laporan?.wilayah.kabupaten},
              {laporan?.wilayah.provinsi}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Jumlah Penerima
              </label>
              <p>{laporan?.jumlah_penerima}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Tanggal Penyaluran
              </label>
              <p>
                {laporan?.tanggal_penyaluran
                  ? new Date(laporan.tanggal_penyaluran).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Tanggal tidak tersedia"}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Bukti Penyaluran
            </label>
            <Button
              variant="outline"
              onClick={handleDownloadBukti}
              disabled={!laporan?.bukti_penyaluran || isDownloading}
            >
              {isDownloading ? "Mengunduh..." : "Unduh Bukti"}
            </Button>
          </div>

          {/* Catatan Admin untuk Penolakan/Persetujuan */}
          {laporan?.status === "Pending" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Alasan Penolakan (Wajib jika ditolak)
              </label>
              <Textarea
                value={alasanPenolakan}
                onChange={(e) => setAlasanPenolakan(e.target.value)}
                placeholder="Berikan alasan jika menolak laporan"
              />
            </div>
          )}

          {/* Tombol Aksi */}
          {laporan?.status === "Pending" && (
            <div className="flex justify-end gap-2">
              <Button
                variant="destructive"
                onClick={handleTolak}
                disabled={isRejecting}
              >
                {isRejecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menolak...
                  </>
                ) : (
                  "Tolak"
                )}
              </Button>
              <Button onClick={handleSetujui} disabled={isApproving}>
                {isApproving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Menyetujui...
                  </>
                ) : (
                  "Setujui"
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
