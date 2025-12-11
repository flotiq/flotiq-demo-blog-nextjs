import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/app/_lib/utils';

const badgeVariants = cva(
  'w-fit inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        blue: 'bg-blue-100 text-blue-700',
        green: 'bg-green-100 text-green-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        indigo: 'bg-indigo-100 text-indigo-800 ',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
