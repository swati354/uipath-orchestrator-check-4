import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
interface StatusBadgeProps {
  status: string;
  className?: string;
}
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    // Green statuses - Success, Available, Completed
    if (['available', 'success', 'completed', 'successful'].includes(normalizedStatus)) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    // Yellow statuses - Running, Busy, InProgress
    if (['running', 'busy', 'inprogress', 'in progress', 'pending'].includes(normalizedStatus)) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    // Red statuses - Failed, Error, Disconnected
    if (['failed', 'error', 'disconnected', 'faulted'].includes(normalizedStatus)) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    // Default gray for unknown statuses
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };
  return (
    <Badge 
      variant="outline" 
      className={cn(
        'text-xs font-medium border',
        getStatusStyle(status),
        className
      )}
    >
      {status}
    </Badge>
  );
}