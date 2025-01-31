export interface Booking {
    id: string;
    guestName: string;
    roomNumber: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
    paymentStatus: 'paid' | 'partially_paid' | 'unpaid';
    totalAmount: number;
    charges: {
      roomCost: number;
      taxes: number;
      extras: number;
    };
  }