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
import { Room } from '@/interfaces/room-interface'
import {User} from "@/interfaces/user-interface"
interface RoomListProps {
  currentUser: User
  rooms: Room[]
  onSelectRoom: (room: Room) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RoomList({ currentUser, rooms, onSelectRoom }: RoomListProps) {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesType = filters.type === 'all' || room.type === filters.type
      const matchesStatus = filters.status === 'all' || room.status === filters.status
      const matchesSearch = 
        searchTerm === '' || 
        room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.id.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesType && matchesStatus && matchesSearch
    })
  }, [rooms, filters, searchTerm])

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return <Badge variant="default">Available</Badge>
      case 'occupied':
        return <Badge variant="secondary">Occupied</Badge>
      case 'maintenance':
        return <Badge variant="destructive">Maintenance</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="roomType">Room Type</Label>
          <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
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
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by room number or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Cleaned</TableHead>
            <TableHead>Next Reservation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.number}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>{getStatusBadge(room.status)}</TableCell>
              <TableCell>{room.lastCleaned}</TableCell>
              <TableCell>{room.nextReservation || 'N/A'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectRoom(room)}
                >
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

