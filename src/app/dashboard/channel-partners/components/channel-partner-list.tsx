import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChannelPartnerModal } from "./channel-partner-modal";
import { ChannelPartner } from "@/interfaces/channel-partner-interface";
import { User } from "@/interfaces/user-interface";

interface ChannelPartnerListProps {
  currentUser: User;
}

export function ChannelPartnerList({ currentUser }: ChannelPartnerListProps) {
  const [selectedPartner, setSelectedPartner] = useState<ChannelPartner | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partners, setPartners] = useState<ChannelPartner[]>([
    {
      id: "CP-001",
      name: "Expedia",
      status: "active",
      bookingsThisMonth: 150,
      totalRevenue: 50000,
      commissionRate: 10,
      contactEmail: "partner@expedia.com",
      contactPhone: "+1 (123) 456-7890",
      imageUrl: "https://logo.clearbit.com/expedia.com",
    },
    {
      id: "CP-002",
      name: "Booking.com",
      status: "active",
      bookingsThisMonth: 200,
      totalRevenue: 75000,
      commissionRate: 12,
      contactEmail: "partner@booking.com",
      contactPhone: "+1 (234) 567-8901",
      imageUrl: "https://logo.clearbit.com/booking.com",
    },
    {
      id: "CP-003",
      name: "Airbnb",
      status: "inactive",
      bookingsThisMonth: 0,
      totalRevenue: 30000,
      commissionRate: 8,
      contactEmail: "partner@airbnb.com",
      contactPhone: "+1 (345) 678-9012",
      imageUrl: "https://logo.clearbit.com/airbnb.com",
    },
  ]);

  const handlePartnerClick = (partner: ChannelPartner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleAddPartner = () => {
    setSelectedPartner(null);
    setIsModalOpen(true);
  };

  const handleSavePartner = (partner: ChannelPartner) => {
    if (selectedPartner) {
      // Update existing partner
      setPartners(partners.map((p) => (p.id === partner.id ? partner : p)));
    } else {
      // Add new partner
      setPartners([...partners, partner]);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Channel Partners</h2>
        <Button onClick={handleAddPartner}>Add New Partner</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Bookings This Month</TableHead>
            <TableHead>Total Revenue</TableHead>
            <TableHead>Commission Rate</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{partner.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {partner.id}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    partner.status === "active" ? "default" : "secondary"
                  }
                >
                  {partner.status}
                </Badge>
              </TableCell>
              <TableCell>{partner.bookingsThisMonth}</TableCell>
              <TableCell>${partner.totalRevenue.toLocaleString()}</TableCell>
              <TableCell>{partner.commissionRate}%</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePartnerClick(partner)}
                >
                  View Dashboard
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ChannelPartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        partner={selectedPartner || undefined}
        currentUser={currentUser}
        onSave={handleSavePartner}
      />
    </>
  );
}
