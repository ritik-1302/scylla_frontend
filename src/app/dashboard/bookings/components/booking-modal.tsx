import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {User} from "@/interfaces/user-interface";
import {Booking} from "@/interfaces/booking-interface";
interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  booking?: Booking | null
  currentUser: User
  onSave: (booking: Booking) => void
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BookingModal({ isOpen, onClose, booking, currentUser, onSave }: BookingModalProps) {
  const [editMode, setEditMode] = useState(!booking)
  const [formData, setFormData] = useState<Booking>({
    id: '',
    guestName: '',
    roomNumber: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    status: 'pending',
    paymentStatus: 'unpaid',
    totalAmount: 0,
    charges: {
      roomCost: 0,
      taxes: 0,
      extras: 0
    }
  })

  useEffect(() => {
    if (booking) {
      setFormData(booking)
      setEditMode(false)
    } else {
      setFormData({
        id: `BK-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        guestName: '',
        roomNumber: '',
        roomType: '',
        checkIn: '',
        checkOut: '',
        status: 'pending',
        paymentStatus: 'unpaid',
        totalAmount: 0,
        charges: {
          roomCost: 0,
          taxes: 0,
          extras: 0
        }
      })
      setEditMode(true)
    }
  }, [booking])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleChargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      charges: {
        ...prev.charges,
        [name]: parseFloat(value)
      },
      totalAmount: prev.charges.roomCost + prev.charges.taxes + prev.charges.extras
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{booking ? `Booking ${booking.id}` : 'New Booking'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guestName">Guest Name</Label>
              <Input
                id="guestName"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                disabled={!editMode}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                disabled={!editMode}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Select
                name="roomType"
                value={formData.roomType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, roomType: value }))}
                disabled={!editMode}
              >
                <SelectTrigger id="roomType">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                id="checkIn"
                name="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={handleInputChange}
                disabled={!editMode}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                id="checkOut"
                name="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={handleInputChange}
                disabled={!editMode}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Booking['status'] }))}
                disabled={!editMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="checked-out">Checked Out</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                name="paymentStatus"
                value={formData.paymentStatus}
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentStatus: value as Booking['paymentStatus'] }))}
                disabled={!editMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partially_paid">Partially Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Charges Breakdown</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomCost">Room Cost</Label>
                <Input
                  id="roomCost"
                  name="roomCost"
                  type="number"
                  value={formData.charges.roomCost}
                  onChange={handleChargeChange}
                  disabled={!editMode}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxes">Taxes</Label>
                <Input
                  id="taxes"
                  name="taxes"
                  type="number"
                  value={formData.charges.taxes}
                  onChange={handleChargeChange}
                  disabled={!editMode}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extras">Extras</Label>
                <Input
                  id="extras"
                  name="extras"
                  type="number"
                  value={formData.charges.extras}
                  onChange={handleChargeChange}
                  disabled={!editMode}
                  required
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              type="number"
              value={formData.totalAmount}
              onChange={handleInputChange}
              disabled
              required
            />
          </div>
          {editMode && (
            <Button type="submit" className="w-full">
              {booking ? 'Update Booking' : 'Create Booking'}
            </Button>
          )}
        </form>
        {booking && !editMode && (
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

