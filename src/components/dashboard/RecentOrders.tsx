import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { orders } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusStyles = {
  pending: 'bg-accent text-accent-foreground',
  processing: 'bg-sky/30 text-foreground',
  shipped: 'bg-lavender/30 text-foreground',
  delivered: 'bg-mint/30 text-secondary-foreground',
};

const statusEmoji = {
  pending: '⏳',
  processing: '🔄',
  shipped: '📦',
  delivered: '✅',
};

// 🇮🇳 INR formatter
const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export function RecentOrders() {
  const recentOrders = orders.slice(0, 5);

  return (
    <Card className="border-0 shadow-soft hover-lift">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        <p className="text-sm text-muted-foreground">Latest customer purchases</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Order</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Total</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>

                {/* ✅ INR currency */}
                <TableCell>{formatINR(order.total)}</TableCell>

                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      'rounded-full px-3 py-1 font-medium',
                      statusStyles[order.status]
                    )}
                  >
                    <span className="mr-1">{statusEmoji[order.status]}</span>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}