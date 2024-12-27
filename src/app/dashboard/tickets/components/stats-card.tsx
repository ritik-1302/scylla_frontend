import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCardProps } from "@/interfaces/stats-card-interface";



export default function StatsCard({headingText,numTickets}:StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{headingText}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl items-center font-bold">{numTickets}</div>
      </CardContent>
    </Card>
  );
}
