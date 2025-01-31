import { useState, useMemo } from 'react'
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {User} from "@/interfaces/user-interface"
import {Booking} from "@/interfaces/booking-interface"
interface BookingListProps {
  currentUser: User
  bookings: Booking[]
  onSelectBooking: (booking: Booking) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BookingList({ currentUser, bookings, onSelectBooking }: BookingListProps) {
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    roomType: 'all',
    status: 'all',
    paymentStatus: 'all',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesDateRange = 
        (!filters.dateRange.start || booking.checkIn >= filters.dateRange.start) &&
        (!filters.dateRange.end || booking.checkOut <= filters.dateRange.end)
      const matchesRoomType = filters.roomType === 'all' || booking.roomType === filters.roomType
      const matchesStatus = filters.status === 'all' || booking.status === filters.status
      const matchesPaymentStatus = filters.paymentStatus === 'all' || booking.paymentStatus === filters.paymentStatus
      const matchesSearch = 
        searchTerm === '' || 
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomNumber.includes(searchTerm) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesDateRange && matchesRoomType && matchesStatus && matchesPaymentStatus && matchesSearch
    })
  }, [bookings, filters, searchTerm])

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredBookings, currentPage])

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)

  const getPaymentStatusBadge = (status: Booking['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default">Paid</Badge>
      case 'partially_paid':
        return <Badge variant="secondary">Partially Paid</Badge>
      case 'unpaid':
        return <Badge variant="destructive">Unpaid</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="startDate">Check-in Date</Label>
          <Input
            id="startDate"
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, start: e.target.value } }))}
          />
        </div>
        <div>
          <Label htmlFor="endDate">Check-out Date</Label>
          <Input
            id="endDate"
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, end: e.target.value } }))}
          />
        </div>
        <div>
          <Label htmlFor="roomType">Room Type</Label>
          <Select value={filters.roomType} onValueChange={(value) => setFilters(prev => ({ ...prev, roomType: value }))}>
            <SelectTrigger id="roomType">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Deluxe">Deluxe</SelectItem>
              <SelectItem value="Suite">Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="checked-in">Checked In</SelectItem>
              <SelectItem value="checked-out">Checked Out</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="paymentStatus">Payment Status</Label>
          <Select value={filters.paymentStatus} onValueChange={(value) => setFilters(prev => ({ ...prev, paymentStatus: value }))}>
            <SelectTrigger id="paymentStatus">
              <SelectValue placeholder="Select payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partially_paid">Partially Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 md:col-span-4">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by guest name, room number, or booking ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Guest Name</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.guestName}</TableCell>
              <TableCell>{booking.roomNumber}</TableCell>
              <TableCell>{booking.roomType}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>{booking.checkOut}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "confirmed"
                      ? "default"
                      : booking.status === "pending"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>{getPaymentStatusBadge(booking.paymentStatus)}</TableCell>
              <TableCell>${booking.totalAmount}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectBooking(booking)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

