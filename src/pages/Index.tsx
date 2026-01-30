import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout';
import { StatCard, SalesChart, RecentOrders, LowStockAlerts } from '@/components/dashboard';
import { dashboardStats, getGreeting } from '@/data/mockData';

const Dashboard = () => {
  const greeting = getGreeting();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome message */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            {greeting}, Admin! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Sales"
            value={dashboardStats.totalSales}
            prefix="$"
            growth={dashboardStats.salesGrowth}
            icon={DollarSign}
            gradient="lavender"
            delay={0}
          />
          <StatCard
            title="Total Orders"
            value={dashboardStats.totalOrders}
            growth={dashboardStats.ordersGrowth}
            icon={ShoppingCart}
            gradient="mint"
            delay={100}
          />
          <StatCard
            title="Total Customers"
            value={dashboardStats.totalCustomers}
            growth={dashboardStats.customersGrowth}
            icon={Users}
            gradient="peach"
            delay={200}
          />
          <StatCard
            title="Revenue"
            value={dashboardStats.totalRevenue}
            prefix="$"
            growth={dashboardStats.revenueGrowth}
            icon={TrendingUp}
            gradient="sky"
            delay={300}
          />
        </div>

        {/* Charts and tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <LowStockAlerts />
          </div>
        </div>

        {/* Recent orders */}
        <RecentOrders />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
