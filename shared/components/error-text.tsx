import React from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return (
    <p className={cn('absolute -bottom-5 text-red-500 text-[11px] ml-2', className)}>{text}</p>
  );
};
