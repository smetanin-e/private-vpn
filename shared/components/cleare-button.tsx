import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  onClick?: VoidFunction;
}

export const CleareButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 cursor-pointer',
        className,
      )}
    >
      <X className='h-5 w-5' />
    </div>
  );
};
