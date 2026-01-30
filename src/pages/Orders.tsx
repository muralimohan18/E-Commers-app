import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { orders, orderStatuses } from '@/data/mockData';
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

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'date' | 'total'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = sortField === 'date' ? new Date(a.date).getTime() : a.total;
      const bValue = sortField === 'date' ? new Date(b.date).getTime() : b.total;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const toggleSort = (field: 'date' | 'total') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: 'date' | 'total' }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders 🛍️</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage customer orders
          </p>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders or customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0 rounded-xl"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] rounded-xl border-0 bg-muted/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {orderStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'All'
                        ? 'All Statuses'
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders table */}
        {filteredOrders.length === 0 ? (
          <Card className="border-0 shadow-soft">
            <CardContent className="py-16 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold">No orders found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-soft overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/30">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead
                    className="font-semibold cursor-pointer hover:text-primary transition-colors"
                    onClick={() => toggleSort('date')}
                  >
                    Date
                    <SortIcon field="date" />
                  </TableHead>
                  <TableHead className="font-semibold">Items</TableHead>
                  <TableHead
                    className="font-semibold cursor-pointer hover:text-primary transition-colors"
                    onClick={() => toggleSort('total')}
                  >
                    Total
                    <SortIcon field="total" />
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <Collapsible
                    key={order.id}
                    open={expandedOrder === order.id}
                    onOpenChange={() =>
                      setExpandedOrder(expandedOrder === order.id ? null : order.id)
                    }
                    asChild
                  >
                    <>
                      <CollapsibleTrigger asChild>
                        <TableRow
                          className="hover:bg-muted/50 cursor-pointer transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.customerEmail}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items} items</TableCell>
                          <TableCell className="font-semibold">
                            ${order.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={cn(
                                'rounded-full px-3 py-1 font-medium',
                                statusStyles[order.status]
                              )}
                            >
                              <span className="mr-1">{statusEmoji[order.status]}</span>
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="rounded-xl">
                              {expandedOrder === order.id ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <TableRow className="bg-muted/20 hover:bg-muted/30">
                          <TableCell colSpan={7} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="gradient-lavender/20 rounded-xl p-4">
                                <h4 className="font-semibold mb-2">
                                  📍 Shipping Address
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  123 Main Street
                                  <br />
                                  Apt 4B
                                  <br />
                                  New York, NY 10001
                                </p>
                              </div>
                              <div className="bg-muted/50 rounded-xl p-4">
                                <h4 className="font-semibold mb-2">💳 Payment</h4>
                                <p className="text-sm text-muted-foreground">
                                  Credit Card ending in 4242
                                  <br />
                                  Paid on {order.date}
                                </p>
                              </div>
                              <div className="bg-muted/50 rounded-xl p-4">
                                <h4 className="font-semibold mb-2">📝 Notes</h4>
                                <p className="text-sm text-muted-foreground">
                                  Gift wrap requested. Leave at door.
                                </p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Orders;
