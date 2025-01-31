export interface Room {
    id: string;
    number: string;
    type: 'Standard' | 'Deluxe' | 'Suite';
    status: 'available' | 'occupied' | 'maintenance';
    lastCleaned: string;
    nextReservation: string | null;
  }