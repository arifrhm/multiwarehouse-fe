export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: string;
  expectedDeliveryDate: string;
}