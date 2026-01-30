import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;   // kept for compatibility
  suffix?: string;   // kept for compatibility
  growth?: number;
  icon: LucideIcon;
  gradient: 'lavender' | 'mint' | 'peach' | 'sky';
  delay?: number;
}

// 🇮🇳 INR formatter
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  growth,
  icon: Icon,
  gradient,
  delay = 0,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const gradientClasses = {
    lavender: 'gradient-lavender',
    mint: 'gradient-mint',
    peach: 'gradient-peach',
    sky: 'gradient-sky',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden hover-lift border-0 shadow-soft transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            {/* ✅ INR formatted value */}
            <p className="text-3xl font-bold text-foreground animate-count-up">
              {formatINR(displayValue)}
            </p>

            {growth !== undefined && (
              <p
                className={cn(
                  'text-sm font-medium flex items-center gap-1',
                  growth >= 0 ? 'text-secondary-foreground' : 'text-destructive'
                )}
              >
                <span>{growth >= 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(growth)}%</span>
                <span className="text-muted-foreground font-normal">vs last month</span>
              </p>
            )}
          </div>

          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              gradientClasses[gradient]
            )}
          >
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}