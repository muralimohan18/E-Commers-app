import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { salesData } from '@/data/mockData';

// 🇮🇳 INR formatter
const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export function SalesChart() {
  return (
    <Card className="border-0 shadow-soft hover-lift">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sales Overview</CardTitle>
        <p className="text-sm text-muted-foreground">Last 7 days performance</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(260, 60%, 75%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(260, 60%, 75%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 50%, 75%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(160, 50%, 75%)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260, 25%, 90%)" vertical={false} />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(240, 10%, 45%)', fontSize: 12 }}
              />

              {/* ✅ INR Y-Axis */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(240, 10%, 45%)', fontSize: 12 }}
                tickFormatter={(value) => formatINR(value)}
              />

              {/* ✅ INR Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px -4px hsl(260, 60%, 65%, 0.15)',
                }}
                labelStyle={{ color: 'hsl(240, 20%, 20%)', fontWeight: 600 }}
                formatter={(value: number, name: string) => [
                  name === 'sales' ? formatINR(value) : value,
                  name === 'sales' ? 'Revenue' : 'Orders',
                ]}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(260, 60%, 65%)"
                strokeWidth={3}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}