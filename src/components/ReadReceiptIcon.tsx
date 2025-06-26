import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReadReceiptStatus = 'sent' | 'delivered' | 'read';

interface ReadReceiptIconProps {
  status: ReadReceiptStatus;
  className?: string;
}

const ReadReceiptIcon: React.FC<ReadReceiptIconProps> = ({ status, className }) => {
  console.log('ReadReceiptIcon loaded with status:', status);

  const iconSize = "h-4 w-4";

  switch (status) {
    case 'read':
      return <CheckCheck className={cn(iconSize, "text-blue-500", className)} />;
    case 'delivered':
      return <CheckCheck className={cn(iconSize, "text-muted-foreground", className)} />;
    case 'sent':
      return <Check className={cn(iconSize, "text-muted-foreground", className)} />;
    default:
      return null;
  }
};

export default ReadReceiptIcon;