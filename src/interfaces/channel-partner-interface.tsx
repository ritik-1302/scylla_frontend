export interface ChannelPartner {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    bookingsThisMonth: number;
    totalRevenue: number;
    commissionRate: number;
    contactEmail: string;
    contactPhone: string;
    imageUrl: string;
  }