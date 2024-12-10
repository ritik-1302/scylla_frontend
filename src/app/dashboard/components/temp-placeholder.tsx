import {  Users } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4000 },
  { name: "May", revenue: 3000 },
  { name: "Jun", revenue: 5000 },
  { name: "Jul", revenue: 4000 },
  { name: "Aug", revenue: 3000 },
  { name: "Sep", revenue: 5000 },
  { name: "Oct", revenue: 4000 },
  { name: "Nov", revenue: 3000 },
  { name: "Dec", revenue: 5000 },
]

const todoItems = [
  { id: "todo1", label: "Review project proposal" },
  { id: "todo2", label: "Prepare presentation slides" },
  { id: "todo3", label: "Schedule team meeting" },
  { id: "todo4", label: "Update client documentation" },
  { id: "todo5", label: "Test new feature implementation" },
]

export function DashboardContent() {
  const maxRevenue = Math.max(...data.map(item => item.revenue))

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Now
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <svg className="h-full w-full" viewBox="0 0 1200 350">
                <g transform="translate(40, 20)">
                  {/* Y-axis */}
                  <line x1="0" y1="0" x2="0" y2="280" stroke="currentColor" strokeOpacity="0.1" />
                  {[0, 1000, 2000, 3000, 4000, 5000].map((tick, i) => (
                    <g key={i} transform={`translate(0, ${280 - (tick / maxRevenue) * 280})`}>
                      <line x1="0" y1="0" x2="-6" y2="0" stroke="currentColor" />
                      <text x="-10" y="0" textAnchor="end" dominantBaseline="middle" fontSize="12" fill="currentColor">
                        ${tick}
                      </text>
                    </g>
                  ))}
                  
                  {/* Bars and revenue labels */}
                  {data.map((item, index) => {
                    const x = index * 90 + 45
                    const y = 280 - (item.revenue / maxRevenue) * 280
                    return (
                      <g key={index}>
                        <rect
                          x={x - 20}
                          y={y}
                          width="40"
                          height={280 - y}
                          fill="hsl(var(--primary))"
                          opacity="0.8"
                        />
                        <text
                          x={x}
                          y={y - 10}
                          textAnchor="middle"
                          fontSize="12"
                          fill="currentColor"
                        >
                          ${item.revenue}
                        </text>
                        <text
                          x={x}
                          y="295"
                          textAnchor="middle"
                          fontSize="12"
                          fill="currentColor"
                        >
                          {item.name}
                        </text>
                      </g>
                    )
                  })}
                  
                  {/* Trend line */}
                  <path
                    d={data.map((item, index) => {
                      const x = index * 90 + 45
                      const y = 280 - (item.revenue / maxRevenue) * 280
                      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                    }).join(' ')}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Olivia Martin</p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Jackson Lee</p>
                  <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">William Kim</p>
                  <p className="text-sm text-muted-foreground">will@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Sofia Davis</p>
                  <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>
            Your tasks for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todoItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox id={item.id} />
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

