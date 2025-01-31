import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Room} from "@/interfaces/room-interface"


interface RoomMetricsProps {
  rooms: Room[]
}

export function RoomMetrics({ rooms }: RoomMetricsProps) {
  const totalRooms = rooms.length
  const availableRooms = rooms.filter(room => room.status === 'available').length
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length
  const maintenanceRooms = rooms.filter(room => room.status === 'maintenance').length
  const occupancyRate = (occupiedRooms / totalRooms) * 100

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRooms}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableRooms}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{occupiedRooms}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rooms in Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{maintenanceRooms}</div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{occupancyRate.toFixed(2)}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

