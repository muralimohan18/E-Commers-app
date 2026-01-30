import { AlertTriangle, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function LowStockAlerts() {
  const lowStockProducts = products.filter(
    (p) => p.status === 'low-stock' || p.status === 'out-of-stock'
  );

  return (
    <Card className="border-0 shadow-soft hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-peach flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Stock Alerts</CardTitle>
            <p className="text-sm text-muted-foreground">
              {lowStockProducts.length} items need attention
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {lowStockProducts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>All products are well-stocked! 🎉</p>
          </div>
        ) : (
          lowStockProducts.map((product) => (
            <div
              key={product.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl transition-colors',
                product.status === 'out-of-stock'
                  ? 'bg-destructive/10'
                  : 'bg-accent/50'
              )}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {product.stock === 0 ? (
                    <span className="text-destructive font-medium">Out of stock</span>
                  ) : (
                    <span className="text-accent-foreground font-medium">
                      {product.stock} left
                    </span>
                  )}
                </p>
              </div>
              {product.status === 'out-of-stock' && (
                <span className="text-lg">🚨</span>
              )}
              {product.status === 'low-stock' && (
                <span className="text-lg">⚠️</span>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
