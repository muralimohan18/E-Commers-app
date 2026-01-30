import { useState, useEffect } from 'react';
import { Search, Users as UsersIcon } from 'lucide-react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { customers } from '@/data/mockData';

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // 🇮🇳 Indian page branding
  useEffect(() => {
    document.title = 'Customers | E-Commerce India';
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers 🇮🇳</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your Indian customer base
          </p>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers grid */}
        {filteredCustomers.length === 0 ? (
          <Card className="border-0 shadow-soft">
            <CardContent className="py-16 text-center">
              <UsersIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold">No customers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer, index) => (
              <Card
                key={customer.id}
                className="border-0 shadow-soft hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-14 h-14 rounded-xl border-2 border-lavender">
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback className="rounded-xl gradient-mint text-secondary-foreground font-semibold">
                        {customer.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {customer.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {customer.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-lavender/20 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold text-primary">
                        {customer.totalOrders}
                      </p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>

                    <div className="bg-mint/20 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold text-secondary-foreground">
                        {formatINR(customer.totalSpent)}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Spent</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Customer since{' '}
                      <span className="font-medium text-foreground">
                        {new Date(customer.joinedDate).toLocaleDateString('en-IN', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-soft gradient-lavender">
            <CardContent className="p-6 text-center text-primary-foreground">
              <p className="text-4xl font-bold">{customers.length}</p>
              <p className="text-sm opacity-90">Total Customers</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft gradient-mint">
            <CardContent className="p-6 text-center text-secondary-foreground">
              <p className="text-4xl font-bold">
                {formatINR(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
              </p>
              <p className="text-sm opacity-90">Lifetime Revenue</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft gradient-peach">
            <CardContent className="p-6 text-center text-accent-foreground">
              <p className="text-4xl font-bold">
                {Math.round(
                  customers.reduce((sum, c) => sum + c.totalOrders, 0) /
                    customers.length
                )}
              </p>
              <p className="text-sm opacity-90">Avg Orders per Customer</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;